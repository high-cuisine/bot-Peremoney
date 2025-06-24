import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { TelegramBotService } from '../telegram-bot.service';

let telegramBotServiceInstance: TelegramBotService | null = null;
export function setTelegramBotServiceInstance(instance: TelegramBotService) {
  telegramBotServiceInstance = instance;
}

export const addCancelButton = async (ctx: SceneContext) => {
  await ctx.reply('Для выхода из текущего режима нажмите кнопку "Отмена" или "Главное меню"', {
    reply_markup: {
      keyboard: [
        [{ text: 'Отмена' }, { text: 'Главное меню' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
};

export const handleCancelButton = async (ctx: SceneContext, text: string) => {
  if (text === 'Отмена') {
    await ctx.reply('Выход из текущего режима', {
      reply_markup: {
        remove_keyboard: true,
        inline_keyboard: [
          [{ text: 'В меню', callback_data: 'start' }]
        ]
      },
    });

    await ctx.scene.leave();
    
    return true;
  }
  
  if (text === 'Главное меню') {
    await ctx.reply('Переход в главное меню', {
      reply_markup: {
        remove_keyboard: true,
      },
    });

    await ctx.scene.leave();
    
    // Используем sendBanner вместо /start
    if (telegramBotServiceInstance) {
      await telegramBotServiceInstance.sendBanner(ctx);
    } else {
      await ctx.reply('/start');
    }
    
    return true;
  }
  
  return false;
}; 