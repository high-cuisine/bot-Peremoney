import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { AdminService } from 'src/modules/admin/admin.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';
import { BotMessages } from '../../messages/messages';
import { CallsService } from 'src/modules/calls/calls.service';
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper';
import { RedisService } from 'src/core/redis/redis.service';

interface StartCallingSession {
  step: 'instructions' | 'call_text' | 'excel_file' | 'confirmation';
  callText?: string;
  phoneNumbers?: string[];
}

@Injectable()
@Scene('start_calling')
export class StartCallingScene {
  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService,
    private readonly callsService: CallsService,
    private redisService: RedisService 
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    console.log('[StartCalling] Scene entered by user:', ctx.from?.id);
    
    if (!ctx.session['startCalling']) {
      ctx.session['startCalling'] = {} as StartCallingSession;
    }
    
    const session = ctx.session['startCalling'] as StartCallingSession;
    session.step = 'instructions';

    await ctx.reply(BotMessages.calling.start, {
      parse_mode: 'HTML',
    }); 

    await addCancelButton(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    if (!ctx.session['startCalling']) {
      ctx.session['startCalling'] = {} as StartCallingSession;
    }
    
    const session = ctx.session['startCalling'] as StartCallingSession;
    const text = (ctx.message as any).text;

    if (await handleCancelButton(ctx, text)) {
      return;
    }

    if(text === '/exit') {
      console.log('[StartCalling] User exited the scene');
      await ctx.reply('Выход из процесса обзвона');
      await ctx.scene.leave();
      return;
    }

    switch (session.step) {
      case 'instructions':
        if (text.length < 10) {
          console.log('[StartCalling] Text too short:', text.length, 'chars');
          await ctx.reply('Текст слишком короткий. Пожалуйста, напишите более подробный текст для обзвона');
          return;
        }
        session.callText = text;
        session.step = 'excel_file';
        console.log('[StartCalling] Call text saved, length:', text.length);
        await ctx.reply(
          'Отправьте Excel файл со списком номеров телефонов.\n' +
          'Файл должен содержать колонку с номерами в международном формате.',
          Markup.inlineKeyboard([
            [Markup.button.callback('Отменить процесс', 'cancel_calling')]
          ])
        );
        break;
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: SceneContext) {
    const session = ctx.session['startCalling'] as StartCallingSession;
    
    if (session.step === 'excel_file') {
      const document = (ctx.message as any).document;
      
      if (!document.file_name.endsWith('.xlsx') && !document.file_name.endsWith('.xls')) {
        console.log('[StartCalling] Invalid file format:', document.file_name);
        await ctx.reply('Пожалуйста, отправьте файл в формате Excel (.xlsx или .xls)');
        return;
      }

      const fileLink = await ctx.telegram.getFileLink(document.file_id);
      const response = await fetch(fileLink);
      const buffer = await response.arrayBuffer();

      const leadsData = await this.exelService.readExelByOneColumn(Buffer.from(buffer));
      console.log(leadsData);
      session.phoneNumbers = leadsData;

      console.log('[StartCalling] Excel processed:', {
        phones: session.phoneNumbers.length,
        textLength: session.callText?.length
      });

      await ctx.reply(
        'Файл получен! Проверьте данные:\n\n' +
        `Текст для обзвона: ${session.callText}\n` +
        `Количество номеров: ${session.phoneNumbers.length}\n\n` +
        'Подтвердите запуск обзвона:',
        Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ Подтвердить', 'confirm_calling'),
            Markup.button.callback('❌ Отменить', 'cancel_calling')
          ]
        ])
      );
      
      session.step = 'confirmation';
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = (ctx.callbackQuery as any).data;
    const session = ctx.session['startCalling'] as StartCallingSession;

    if (callbackData === 'cancel_calling') {
      console.log('[StartCalling] Process cancelled by user');
      await ctx.reply('Процесс обзвона отменен.');
      await ctx.scene.leave();
    } else if (callbackData === 'confirm_calling') {
      console.log('[StartCalling] Process confirmed:', {
        textLength: session.callText?.length,
        phonesCount: session.phoneNumbers?.length
      });
      
      try {

        await this.adminService.sendAdminCallingOrder(ctx.from.username, session.callText, session.phoneNumbers)
        //const response = await this.callsService.createCall(session.callText, session.phoneNumbers);
        console.log('[StartCalling] Call created successfully');
        await ctx.reply('Заявка на обзвон создана!', 
            Markup.inlineKeyboard([
                [Markup.button.callback('В меню', 'start')]
            ])
        );
      } catch (error) {
        console.error('[StartCalling] Error creating call:', error);
        await ctx.reply('Произошла ошибка при создании заявки на обзвон. Пожалуйста, попробуйте позже.');
      }
      
      await ctx.scene.leave();
    }
  }
} 