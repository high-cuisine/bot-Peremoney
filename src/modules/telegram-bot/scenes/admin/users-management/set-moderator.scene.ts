import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { UsersService } from 'src/modules/users/users.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

interface SetModeratorSession {
  username?: string;
  step: 'username' | 'confirmation';
}

@Injectable()
@Scene('admin_set_moderator')
export class SetModeratorScene {
  constructor(private readonly usersService: UsersService, private readonly adminService: AdminService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    // Только админы могут назначать модераторов
    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('Только администраторы могут назначать модераторов!');
      return ctx.scene.leave();
    }

    await ctx.reply(
      'Введите никнейм пользователя, которого хотите назначить модератором (без @):',
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

    const username = ctx.scene.state['username'];
    const message = ctx.message as any;
    if (!message?.text) return;

    // Если username еще не установлен, значит это первый ввод
    if (!username) {
      const inputUsername = message.text.trim().replace('@', '');
      ctx.scene.state['username'] = inputUsername;

      // Проверяем существование пользователя
      const user = await this.usersService.getUserByName(inputUsername);
      if (!user) {
        await ctx.reply('Пользователь не найден');
        return ctx.scene.leave();
      }

      // Проверяем, не является ли пользователь уже модератором или админом
      if (user.role === 'moderator' || user.role === 'admin') {
        await ctx.reply('Этот пользователь уже является модератором или администратором');
        return ctx.scene.leave();
      }

      await ctx.reply(
        `Вы уверены, что хотите назначить пользователя ${inputUsername} модератором?`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback('Да', 'confirm_moderator'),
            Markup.button.callback('Нет', 'cancel_moderator'),
          ],
        ])
      );
      return;
    }
  }

  @On('callback_query')
  async onConfirmation(@Ctx() ctx: SceneContext) {
    const callbackQuery = ctx.callbackQuery as any;
    if (!callbackQuery?.data) return;

    const username = ctx.scene.state['username'];

    if (callbackQuery.data === 'confirm_moderator') {
      try {
        await this.usersService.updateUser(username, { role: 'moderator' });
        console.log(`Пользователь ${username} назначен модератором администратором ${ctx.from?.username}`);
        await ctx.reply(`Пользователь ${username} успешно назначен модератором`);
      } catch (error) {
        console.error(`Ошибка при назначении модератора ${username}:`, error);
        await ctx.reply('Произошла ошибка при назначении модератора');
      }
    } else {
      await ctx.reply('Операция отменена');
    }

    return ctx.scene.leave();
  }
} 