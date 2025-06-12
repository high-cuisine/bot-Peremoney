import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { UsersService } from 'src/modules/users/users.service';
import { ExelService } from 'src/modules/Exel-Module/exelModule.service';
import { TelegramBotService } from '../../../telegram-bot.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { Markup } from 'telegraf';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

@Injectable()
@Scene('admin_show_users')
export class ShowUsersScene {
  constructor(
    private readonly usersService: UsersService,
    private readonly exelService: ExelService,
    private readonly telegramService: TelegramBotService,
    private readonly adminService: AdminService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('У вас нет прав для выполнения этого действия');
      return ctx.scene.leave();
    }

    try {
      const users = await this.usersService.getAllUsers();
      
      // Преобразуем BigInt значения в строки
      const serializedUsers = users.map(user => ({
        ...user,
        telegramId: user.telegramId?.toString(),
        id: user.id?.toString(),
        lastAction: user.lastAction?.toISOString(),
        firstAction: user.firstAction?.toISOString()
      }));

      const buffer = await this.exelService.exportToExcelBuffer(serializedUsers);

      await this.telegramService.sendDocumentBuffer(
        Number(ctx.from.id), 
        Buffer.from(buffer),
        { filename: 'users.xlsx' }
      );
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      await ctx.reply('Произошла ошибка при получении списка пользователей');
    }

    await addCancelButton(ctx);
    return ctx.scene.leave();
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    // ... existing code ...
  }
} 