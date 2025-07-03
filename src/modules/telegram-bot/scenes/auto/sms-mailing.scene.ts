import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { AdminService } from 'src/modules/admin/admin.service';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';
import { MailingService } from 'src/modules/mailing/mailing.service';
import { BotMessages } from '../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper';

interface SmsMailingSession {
  step: 'instructions' | 'message' | 'excel_file';
  message?: string;
}

@Injectable()
@Scene('sms_mailing')
export class SmsMailingScene {
  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService,
    private readonly mailingService: MailingService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    if (!ctx.session['smsMailing']) {
      ctx.session['smsMailing'] = {} as SmsMailingSession;
    }
    
    const session = ctx.session['smsMailing'] as SmsMailingSession;
    session.step = 'instructions';
    
    await ctx.reply(`
💬 <b>Добро пожаловать в процесс создания рассылки!</b>

Правила:
1. Сообщение должно быть в текстовом формате
2. Excel файл с номерами телефонов должен содержать колонку с никами пользователей в Telegram
3. Ники должны быть указаны без символа @

Отправь, в бот текст своего сообщения для рассылки. 

Текст может быть любого объема, содержать любые знаки и эмодзи, а также любые ссылки. Прикрепить файлы, фотографии и видео невозможно. В самом конце под сообщением должен быть контактный ник в Telegram для связи с менеджером или другим представителем твоего бизнеса в виде сообщения "Если Вам интересно, напишите нам @хххххх", либо ссылка на диалог/бота. 


<b>Теперь отправь сообщение для рассылки:</b>`);
    await addCancelButton(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    if (!ctx.session['smsMailing']) {
      ctx.session['smsMailing'] = {} as SmsMailingSession;
    }
    
    const session = ctx.session['smsMailing'] as SmsMailingSession;
    const text = (ctx.message as any).text;
    if (await handleCancelButton(ctx, text)) {
      return;
    }
    if(text === '/exit') {
      await ctx.reply('Выход из вопросов');
      await ctx.scene.leave();
      return;
    }

    switch (session.step) {
      case 'instructions':
        session.message = text;
        session.step = 'excel_file';
        await ctx.reply(
          'Сообщение принято! Теперь отправь Excel файл со списком пользователей. \n Файл должен ОБЯЗАТЕЛЬНО содержать колонку с никами пользователей в Telegram. \n' +
          'Файл должен содержать колонку с номерами телефонов в формате +7XXXXXXXXXX.',
          Markup.inlineKeyboard([
            [Markup.button.callback('Отменить процесс', 'cancel_sms_mailing')]
          ])
        );
        break;
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: SceneContext) {
    const session = ctx.session['smsMailing'] as SmsMailingSession;
    
    if (session.step === 'excel_file') {
      const document = (ctx.message as any).document;
      
      // Проверяем, что это Excel файл
      if (!document.file_name.endsWith('.xlsx') && !document.file_name.endsWith('.xls')) {
        await ctx.reply('Пожалуйста, отправьте файл в формате Excel (.xlsx или .xls)');
        return;
      }

      // Здесь будет ваша бизнес-логика обработки файла
      await ctx.reply('Файл получен! Заявка на SMS-рассылку создана');

      const fileLink = await ctx.telegram.getFileLink(document.file_id);
      const response = await fetch(fileLink);
      const buffer = await response.arrayBuffer();

      const leadsData = await this.exelService.readExelByOneColumn(Buffer.from(buffer));

      console.log(leadsData, session.message);
      await this.mailingService.startMailing(session.message, leadsData);
      await ctx.scene.leave();
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = (ctx.callbackQuery as any).data;
    if (callbackData === 'cancel_sms_mailing') {
      await ctx.reply('Процесс создания SMS-рассылки отменен.');
      await ctx.scene.leave();
    }
    if (callbackData === 'main_menu') {
      await ctx.reply('Переход в главное меню');
      await ctx.scene.leave();
      await ctx.reply('/start');
    }
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из вопросов');
    await ctx.scene.leave();
  }
} 