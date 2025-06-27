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
import { AudioService } from '../../services/audio.service';

interface StartCallingSession {
  step: 'instructions' | 'voice_message' | 'excel_file' | 'confirmation';
  voiceMessage?: {
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  };
  phoneNumbers?: string[];
  isProcessing?: boolean;
}

@Injectable()
@Scene('start_calling')
export class StartCallingScene {
  constructor(
    private readonly adminService: AdminService,
    private readonly exelService: ExelService,
    private readonly callsService: CallsService,
    private redisService: RedisService,
    private readonly audioService: AudioService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    console.log('[StartCalling] Scene entered by user:', ctx.from?.id);
    
    if (!ctx.session['startCalling']) {
      ctx.session['startCalling'] = {} as StartCallingSession;
    }
    
    const session = ctx.session['startCalling'] as StartCallingSession;
    session.step = 'instructions';
    session.isProcessing = false;

    await ctx.reply(BotMessages.calling.start, {
      parse_mode: 'HTML',
    }); 

    await addCancelButton(ctx);
  }

  @On('voice')
  async onVoice(@Ctx() ctx: SceneContext) {
    if (!ctx.session['startCalling']) {
      ctx.session['startCalling'] = {} as StartCallingSession;
    }
    
    const session = ctx.session['startCalling'] as StartCallingSession;
    
    if (session.step !== 'instructions') {
      await ctx.reply('Пожалуйста, сначала отправьте голосовое сообщение для обзвона.');
      return;
    }

    const voice = (ctx.message as any).voice;
    console.log('[StartCalling] Voice message received:', {
      fileId: voice.file_id,
      duration: voice.duration,
      mimeType: voice.mime_type
    });

    try {
      // Получаем файл от Telegram
      const fileLink = await ctx.telegram.getFileLink(voice.file_id);
      const response = await fetch(fileLink);
      const buffer = await response.arrayBuffer();

      // Обрабатываем голосовое сообщение
      const processedVoice = await this.audioService.processVoiceMessage(
        Buffer.from(buffer),
        `voice_${voice.file_id}.${voice.mime_type?.split('/')[1] || 'ogg'}`
      );

      session.voiceMessage = processedVoice;
      session.step = 'excel_file';

      console.log('[StartCalling] Voice message processed:', {
        size: processedVoice.buffer.length,
        fileName: processedVoice.fileName,
        mimeType: processedVoice.mimeType
      });

      await ctx.reply(
        '✅ Голосовое сообщение получено!\n\n' +
        `Длительность: ${voice.duration} секунд\n` +
        `Размер: ${Math.round(processedVoice.buffer.length / 1024)} КБ\n\n` +
        'Теперь отправьте Excel файл со списком номеров телефонов.\n' +
        'Файл должен содержать колонку с номерами в международном формате.',
        Markup.inlineKeyboard([
          [Markup.button.callback('Отменить процесс', 'cancel_calling')]
        ])
      );

    } catch (error) {
      console.error('[StartCalling] Error processing voice message:', error);
      await ctx.reply('Произошла ошибка при обработке голосового сообщения. Пожалуйста, попробуйте еще раз.');
    }
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

    // Если пользователь отправляет текст на этапе инструкций, напоминаем о голосовом сообщении
    if (session.step === 'instructions') {
      await ctx.reply('Пожалуйста, отправьте голосовое сообщение для обзвона, а не текст.');
      return;
    }
  }

  @On('document')
  async onDocument(@Ctx() ctx: SceneContext) {
    console.log('onDocument');
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
        voiceMessage: session.voiceMessage ? 'present' : 'missing'
      });

      await ctx.reply(
        'Файл получен! Проверьте данные:\n\n' +
        `Голосовое сообщение: ✅ Получено (${session.voiceMessage?.buffer.length} байт)\n` +
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
      // Проверяем, не обрабатывается ли уже запрос
      if (session.isProcessing) {
        console.log('[StartCalling] Request already being processed, ignoring duplicate click');
        return;
      }

      console.log('[StartCalling] Process confirmed:', {
        voiceMessageSize: session.voiceMessage?.buffer.length,
        phonesCount: session.phoneNumbers?.length
      });
      
      try {
        if (!session.voiceMessage || !session.phoneNumbers) {
          throw new Error('Missing voice message or phone numbers');
        }

        // Устанавливаем флаг обработки
        session.isProcessing = true;

        await ctx.reply('🔄 Загружаю аудио файл на сервер...');

        await ctx.reply(
          '✅ Заявка на обзвон создана успешно!\n\n' +
          `📊 Статус: ${'Успешно'}\n` +
          `📞 Количество номеров: ${session.phoneNumbers.length}\n` +
          `🎵 Аудио файл: ${session.voiceMessage.fileName}`,
          Markup.inlineKeyboard([
              [Markup.button.callback('В меню', 'start')]
          ])
        );

        const response = await this.callsService.createCallWithAudio(
          session.voiceMessage.buffer,
          session.voiceMessage.fileName,
          session.phoneNumbers
        );

        console.log('[StartCalling] Call created successfully:', response);
        
        

      } catch (error) {
        console.error('[StartCalling] Error creating call:', error);
        // await ctx.reply(
        //   '❌ Произошла ошибка при создании заявки на обзвон.\n\n' +
        //   'Возможные причины:\n' +
        //   '• Неверный формат аудио файла\n' +
        //   '• Проблемы с подключением к серверу\n' +
        //   '• Недостаточно средств на балансе\n\n' +
        //   'Пожалуйста, попробуйте позже или обратитесь в поддержку.'
        // );
      } 
      
      await ctx.scene.leave();
    }
  }
} 