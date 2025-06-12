import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { BannedService } from 'src/modules/users/banned.service';
import { UsersService } from 'src/modules/users/users.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

interface UnbanUserSession {
  username?: string;
  step: 'username' | 'confirmation';
}

@Injectable()
@Scene('admin_delete_ban')
export class AdminUnbanUserScene {
  constructor(
    private readonly bannedService: BannedService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('У вас нет прав для выполнения этого действия');
      return ctx.scene.leave();
    }

    await ctx.reply(
      'Введите никнейм пользователя, которого хотите разбанить (без @):',
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

    // Проверяем, забанен ли пользователь
    const user = await this.usersService.getUserByName(username);
    if (!user) {
      await ctx.reply('Пользователь не найден');
      return ctx.scene.leave();
    }

    if (!user.isBanned) {
      await ctx.reply('Этот пользователь не забанен');
      return ctx.scene.leave();
    }

    await ctx.reply(
      `Вы уверены, что хотите разбанить пользователя ${username}?`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Да', 'unban_confirm'),
          Markup.button.callback('Нет', 'unban_cancel'),
        ],
      ])
    );
  }

  @On('callback_query')
  async onConfirmation(@Ctx() ctx: SceneContext) {
    const callbackQuery = ctx.callbackQuery as any;
    if (!callbackQuery?.data) return;

    const username = ctx.scene.state['username'];

    if (callbackQuery.data === 'unban_confirm') {
      try {
        await this.bannedService.unbanUser(username);
        console.log(`Пользователь ${username} разбанен администратором ${ctx.from?.username}`);
        await ctx.reply(`Пользователь ${username} успешно разбанен`);
      } catch (error) {
        console.error(`Ошибка при разбане пользователя ${username}:`, error);
        await ctx.reply('Произошла ошибка при разбане пользователя');
      }
    } else {
      await ctx.reply('Операция отменена');
    }

    return ctx.scene.leave();
  }
} 