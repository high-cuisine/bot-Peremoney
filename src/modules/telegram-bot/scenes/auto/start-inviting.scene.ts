import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { AdminService } from 'src/modules/admin/admin.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';

interface StartInvitingSession {
  step: 'instructions' | 'group_link' | 'group_id' | 'excel_file';
  groupLink?: string;
  groupId?: string;
}

@Injectable()
@Scene('start_inviting')
export class StartInvitingScene {

  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    
    if (!ctx.session['startInviting']) {
      ctx.session['startInviting'] = {} as StartInvitingSession;
    }
    
    const session = ctx.session['startInviting'] as StartInvitingSession;
    session.step = 'instructions';
    
    await ctx.reply(
      'Добро пожаловать в процесс массового приглашения!\n\n' +
      'Правила и инструкции:\n' +
      '1. Убедитесь, что у вас есть права администратора в группе\n' +
      '2. Группа должна быть публичной\n' +
      '3. Excel файл должен содержать колонку с номерами телефонов\n' +
      '4. Номера телефонов должны быть в международном формате\n\n' +
      'Теперь, пожалуйста, отправьте ссылку на группу:'
    );
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    if (!ctx.session['startInviting']) {
      ctx.session['startInviting'] = {} as StartInvitingSession;
    }

   
    
    const session = ctx.session['startInviting'] as StartInvitingSession;
    const text = (ctx.message as any).text;

    if(text === '/exit') {
      await ctx.reply('Выход из вопросов');
      await ctx.scene.leave();
      return;
    }

    switch (session.step) {
      case 'instructions':
        // Проверка формата ссылки на группу
        if (!text.includes('t.me/') && !text.includes('telegram.me/')) {
          await ctx.reply('Неверный формат ссылки. Пожалуйста, отправьте корректную ссылку на группу Telegram');
          return;
        }
        session.groupLink = text;
        session.step = 'group_id';
        await ctx.reply('Теперь отправьте ID группы:');
        break;

      case 'group_id':
        if (!/^-?\d+$/.test(text)) {
          await ctx.reply('ID группы должен содержать только цифры. Пожалуйста, введите корректный ID группы');
          return;
        }
        session.groupId = text;
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

      await this.adminService.sendAdminInvitingOrder(ctx.from.username, session.groupId, session.groupLink, userNames);

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