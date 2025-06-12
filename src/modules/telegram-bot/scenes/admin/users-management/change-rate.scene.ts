import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { UsersService } from 'src/modules/users/users.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

interface ChangeRateSession {
  username?: string;
  step: 'username' | 'rate';
}

@Injectable()
@Scene('admin_change_rate')
export class ChangeRateScene {
  constructor(private readonly usersService: UsersService, private readonly adminService: AdminService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('У вас нет прав для выполнения этого действия');
      return ctx.scene.leave();
    }

    await ctx.reply(
      'Введите никнейм пользователя, которому хотите изменить тариф (без @):',
      Markup.forceReply()
    );
    await addCancelButton(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    const username = text.trim().replace('@', '');
    ctx.scene.state['username'] = username;

    // Проверяем существование пользователя
    const user = await this.usersService.getUserByName(username);
    if (!user) {
      await ctx.reply('Пользователь не найден');
      return ctx.scene.leave();
    }

    await ctx.reply(
      `Текущий тариф пользователя: ${user.rate || 'не установлен'}\n\nВыберите новый тариф:`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Базовый', 'rate_default'),
          Markup.button.callback('Премиум', 'rate_pro'),
        ],
      ])
    );
  }

  @On('callback_query')
  async onRateSelect(@Ctx() ctx: SceneContext) {
    const callbackQuery = ctx.callbackQuery as any;
    if (!callbackQuery?.data) return;

    const newRate = callbackQuery.data.replace('rate_', '');
    const username = ctx.scene.state['username'];

    // Проверяем валидность тарифа
    if (!['default', 'pro'].includes(newRate)) {
      await ctx.reply('Неверный формат тарифа');
      return ctx.scene.leave();
    }

    try {
      await this.usersService.updateUser(username, { rate: newRate });
      console.log(`Пользователь ${username} переведен на тариф: ${newRate} администратором ${ctx.from?.username}`);
      await ctx.reply(`Тариф пользователя ${username} успешно изменен на ${newRate}`);
    } catch (error) {
      console.error(`Ошибка при изменении тарифа пользователя ${username}:`, error);
      await ctx.reply('Произошла ошибка при изменении тарифа');
    }

    return ctx.scene.leave();
  }
} 