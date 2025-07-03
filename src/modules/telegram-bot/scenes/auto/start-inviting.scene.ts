import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { AdminService } from 'src/modules/admin/admin.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';
import { BotMessages } from '../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper';
import { UserBotsService } from 'src/user-bots/user-bots.service';

interface StartInvitingSession {
  step: 'instructions' | 'group_link' | 'excel_file';
  groupLink?: string;
}

@Injectable()
@Scene('start_inviting')
export class StartInvitingScene {

  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService,
    private readonly userBotsService: UserBotsService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    
    if (!ctx.session['startInviting']) {
      ctx.session['startInviting'] = {} as StartInvitingSession;
    }
    
    const session = ctx.session['startInviting'] as StartInvitingSession;
    session.step = 'instructions';

    await ctx.reply(BotMessages.invaiting.start, {
      parse_mode: 'HTML',
    }); 
    
    await ctx.reply(
      `
        👋 <b>Добро пожаловать в процесс запуска инвайтинга (массового приглашения)!</b>

Рекомендации к подготовке чата для инвайтинга: 

1. Нужен чат старше 1 месяца с короткой читаемой ссылкой (t.me/название) и желательно 500+ участников (можно купить заранее "чат с отлежкой")
2. Включи историю сообщений для новых участников.
3. Оформи описание чата: кто ты, что здесь продают, какую проблему решаешь.
4. Сделай 1–2 закрепа: оффер + призыв к действию (получить бонус, перейти к боту).
5. Добавь 3–5 полезных постов до запуска: кейсы, ответы на частые вопросы, разборы.
6. Размести лидмагнит внутри чата: PDF, бонус за "+", кнопка бота.
7. Отключи уведомления о вступлении и лишние права новичков.
8. Укажи ссылку на своего бота или менеджера для консультаций.
9. Включи автоудаление сервисных сообщений о вступлении в чат.
10. Подключи стороннего бота, который реагирует на "+", "Да" и другие триггеры для выдачи бонуса или перехода.
      `
    );

    await ctx.reply(
      `
Правила и инструкции:
1. Убедись, что у тебя есть права администратора в группе
2. Группа должна быть публичной
3. Excel файл должен содержать колонку с номерами телефонов
4. Номера телефонов должны быть в международном формате

Теперь, пожалуйста, отправь ссылку на группу:  
      `
    );

    await addCancelButton(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    console.log('onText');
    if (!ctx.session['startInviting']) {
      ctx.session['startInviting'] = {} as StartInvitingSession;
    }

    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    const session = ctx.session['startInviting'] as StartInvitingSession;

    switch (session.step) {
      case 'instructions':
        // Проверка формата ссылки на группу
        if (!text.includes('t.me/') && !text.includes('telegram.me/')) {
          await ctx.reply('Неверный формат ссылки. Пожалуйста, отправьте корректную ссылку на группу Telegram');
          return;
        }
        session.groupLink = text;
        session.step = 'excel_file';
        await ctx.reply(
          'Отправьте Excel файл со списком клиентов.\n' +
          'Файл должен содержать колонку с номерами телефонов в международном формате.',
          Markup.inlineKeyboard([
            [Markup.button.callback('Отменить процесс', 'cancel_inviting')]
          ])
        );
        break;
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: SceneContext) {
    console.log('onDocument');
    const session = ctx.session['startInviting'] as StartInvitingSession;
    
    if (session.step === 'excel_file') {
      const document = (ctx.message as any).document;
      
      // Проверяем, что это Excel файл
      if (!document.file_name.endsWith('.xlsx') && !document.file_name.endsWith('.xls')) {
        await ctx.reply('Пожалуйста, отправьте файл в формате Excel (.xlsx или .xls)');
        return;
      }

      const fileLink = await ctx.telegram.getFileLink(document.file_id);
      const response = await fetch(fileLink);
      const buffer = await response.arrayBuffer();

      const leadsData = await this.exelService.readExcel(Buffer.from(buffer), ctx.from.id);

      const userNames = leadsData.map(lead => lead.name);

      //await this.adminService.sendAdminInvitingOrder(ctx.from.username, session.groupId, session.groupLink, userNames);
      await this.userBotsService.inviteGroupV2(userNames, session.groupLink);
      await ctx.reply('Файл получен! Заявка создана');
      await ctx.scene.leave();
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = (ctx.callbackQuery as any).data;

    if (callbackData === 'cancel_inviting') {
      await ctx.reply('Процесс приглашения отменен.');
      await ctx.scene.leave();
    }
  }

} 