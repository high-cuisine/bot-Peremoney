import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { AdminService } from 'src/modules/admin/admin.service';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';

interface StartMailingSession {
  step: 'instructions' | 'message' | 'excel_file';
  message?: string;
}

@Injectable()
@Scene('start_mailing')
export class StartMailingScene {
  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    if (!ctx.session['startMailing']) {
      ctx.session['startMailing'] = {} as StartMailingSession;
    }
    
    const session = ctx.session['startMailing'] as StartMailingSession;
    session.step = 'instructions';
    
    await ctx.reply(
      'Добро пожаловать в процесс создания рассылки!\n\n' +
      'Правила и инструкции:\n' +
      '1. Сообщение должно быть в текстовом формате\n' +
      '2. Excel файл должен содержать колонку с юзернеймами пользователей\n' +
      '3. Юзернеймы должны быть указаны без символа @\n\n' +
      'Теперь, пожалуйста, отправьте сообщение для рассылки:'
    );
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    if (!ctx.session['startMailing']) {
      ctx.session['startMailing'] = {} as StartMailingSession;
    }
    
    const session = ctx.session['startMailing'] as StartMailingSession;
    const text = (ctx.message as any).text;

    switch (session.step) {
      case 'instructions':
        session.message = text;
        session.step = 'excel_file';
        await ctx.reply(
          'Сообщение принято! Теперь отправьте Excel файл со списком пользователей.\n' +
          'Файл должен содержать колонку с юзернеймами пользователей.',
          Markup.inlineKeyboard([
            [Markup.button.callback('Отменить процесс', 'cancel_mailing')]
          ])
        );
        break;
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: SceneContext) {
    const session = ctx.session['startMailing'] as StartMailingSession;
    
    if (session.step === 'excel_file') {
      const document = (ctx.message as any).document;
      
      // Проверяем, что это Excel файл
      if (!document.file_name.endsWith('.xlsx') && !document.file_name.endsWith('.xls')) {
        await ctx.reply('Пожалуйста, отправьте файл в формате Excel (.xlsx или .xls)');
        return;
      }

      // Здесь будет ваша бизнес-логика обработки файла
      await ctx.reply('Файл получен! Заявка на рассылку создана');

      const fileLink = await ctx.telegram.getFileLink(document.file_id);
      const response = await fetch(fileLink);
      const buffer = await response.arrayBuffer();

      const leadsData = await this.exelService.readExcel(Buffer.from(buffer), ctx.from.id);

      const userNames = leadsData.map(lead => lead.name);

      await this.adminService.sendAdminMailingOrder(userNames, session.message, ctx.from.username);
      await ctx.scene.leave();
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = (ctx.callbackQuery as any).data;

    if (callbackData === 'cancel_mailing') {
      await ctx.reply('Процесс создания рассылки отменен.');
      await ctx.scene.leave();
    }
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из вопросов');
    await ctx.scene.leave();
  }
} 