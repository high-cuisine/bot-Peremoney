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
      'Добро пожаловать в процесс массового приглашения!\n\n' +
      'Правила и инструкции:\n' +
      '1. Убедитесь, что у вас есть права администратора в группе\n' +
      '2. Группа должна быть публичной\n' +
      '3. Excel файл должен содержать колонку с номерами телефонов\n' +
      '4. Номера телефонов должны быть в международном формате\n\n' +
      'Теперь, пожалуйста, отправьте ссылку на группу:'
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

      const userNames2 = ['Mmmmjoig', 'referfwes262525', 'vffffj']
      await this.userBotsService.inviteGroupV2(userNames2, session.groupLink);
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