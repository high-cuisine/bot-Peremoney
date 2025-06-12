import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { UsersService } from 'src/modules/users/users.service';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

interface ChangeLeadsSession {
  username?: string;
  step: 'username' | 'leads';
}

@Injectable()
@Scene('admin_change_leads')
export class ChangeLeadsScene {
  constructor(private readonly usersService: UsersService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('У вас нет прав для выполнения этого действия');
      return ctx.scene.leave();
    }

    await ctx.reply(
      'Введите никнейм пользователя, которому хотите изменить количество лидов (без @):',
      Markup.forceReply()
    );
    await addCancelButton(ctx);
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    const message = ctx.message as any;
    if (!message?.text) return;

    const text = message.text.trim();
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    const username = ctx.scene.state['username'];

    // Если username еще не установлен, значит это первый ввод
    if (!username) {
      const inputUsername = text.replace('@', '');
      ctx.scene.state['username'] = inputUsername;

      // Проверяем существование пользователя
      const user = await this.usersService.getUserByName(inputUsername);
      if (!user) {
        await ctx.reply('Пользователь не найден');
        return ctx.scene.leave();
      }

      await ctx.reply(
        `Текущее количество лидов пользователя: ${user.leads || 0}\n\nВведите новое количество лидов (только число):`,
        Markup.forceReply()
      );
      return;
    }

    // Если username уже установлен, значит это ввод количества лидов
    const leadsCount = parseInt(text);

    // Проверяем, что введено корректное число
    if (isNaN(leadsCount) || leadsCount < 0) {
      await ctx.reply('Пожалуйста, введите корректное положительное число');
      return;
    }

    try {
      await this.usersService.updateUser(username, { leads: leadsCount });
      console.log(`Пользователю ${username} установлено количество лидов: ${leadsCount} администратором ${ctx.from?.username}`);
      await ctx.reply(`Количество лидов пользователя ${username} успешно изменено на ${leadsCount}`);
    } catch (error) {
      console.error(`Ошибка при изменении количества лидов пользователя ${username}:`, error);
      await ctx.reply('Произошла ошибка при изменении количества лидов');
    }

    return ctx.scene.leave();
  }
} 