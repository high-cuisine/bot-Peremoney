import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

export const addCancelButton = async (ctx: SceneContext) => {
  await ctx.reply('Для выхода из текущего режима нажмите кнопку "Отмена"', {
    reply_markup: {
      keyboard: [[{ text: 'Отмена' }]],
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
  return false;
}; 