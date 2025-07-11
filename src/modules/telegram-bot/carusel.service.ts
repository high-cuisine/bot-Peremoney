import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { Context, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { ratesCarusel } from './carusels/rates.carusel';
import { join } from 'path';
import { createReadStream } from 'fs';
import { InputMediaPhoto } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class CaruselService {
    private readonly logger = new Logger(CaruselService.name);
    constructor(
        @InjectBot() private readonly bot: Telegraf
    ) {}

    async sendCarusel(ctx: Context, page:string = 'free') {

        const carusel = ratesCarusel.filter(item => item.title === page);

        console.log(carusel)

        const photo = carusel.map(item => {
            const photoPath = join(__dirname, '..', '..', 'assets', 'rates', item.photo)
            const photoStream = createReadStream(photoPath)
            return {
                url: { source: photoStream },
                caption: `🔹 ${item.title}`
            }
        })

        if (photo.length > 0) {
            await ctx.replyWithPhoto(photo[0].url, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Бесплатный', callback_data: 'slider:free' }],
                        [{ text: 'Детский', callback_data: 'slider:kids' }],
                        [{ text: 'Взрослый', callback_data: 'slider:adult' }],
                        [{ text: 'Эпический', callback_data: 'slider:epic' }],
                        [{ text: 'Космический', callback_data: 'slider:space' }],
                        [{ text: 'Запредельный', callback_data: 'slider:beyond' }],
                       
                    ]
                }
            }
        );
        }
    }
  
    async editCarusel(ctx: Context, page: string = 'free') {
        const item = ratesCarusel.find(i => i.title === page);
        if (!item) {
          return ctx.answerCbQuery('Слайд не найден', { show_alert: true });
        }
      
        // Читаем изображение
        const photoPath = join(__dirname, '..', '..', 'assets', 'rates', item.photo);
        const stream = createReadStream(photoPath);
      
        // Готовим медиа-объект для editMessageMedia
        const media: InputMediaPhoto = {
          type: 'photo',
          media: { source: stream },
          parse_mode: 'HTML',
        };
      
        // inline-кнопки
        const keyboard = {
                      inline_keyboard: [
              [{ text: 'Пробный',      callback_data: 'slider:free' }],
              [{ text: 'Детский',  callback_data: 'slider:kids' }],
              [{ text: 'Взрослый', callback_data: 'slider:adult' }],
              [{ text: 'Эпический', callback_data: 'slider:epic' }],
              [{ text: 'Космический', callback_data: 'slider:space' }],
              [{ text: 'Запредельный',      callback_data: 'slider:beyond' }],

             
              ...(page !== 'free' ? [[{ text: 'Купить выбранный тариф', callback_data: 'upgrade_rate:' + page }]] : [])
            ],
        };
      
        // Редактируем сообщение в чатe
        await ctx.editMessageMedia(media, { reply_markup: keyboard });
      
        // Убираем «часики» Telegram UI
        await ctx.answerCbQuery();
      } 
}   
