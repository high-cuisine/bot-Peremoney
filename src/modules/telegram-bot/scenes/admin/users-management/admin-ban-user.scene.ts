import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { UsersService } from 'src/modules/users/users.service';
import { SceneContext } from 'telegraf/typings/scenes';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

@Scene('admin_ban_user')
export class AdminBanUserScene {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      await ctx.reply('У вас нет прав для выполнения этого действия');
      await ctx.scene.leave();
      return;
    }

    await ctx.reply(
      'Введите username пользователя, которого хотите забанить (без @):',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Отмена', callback_data: 'cancel' }]
          ]
        }
      }
    );
    await addCancelButton(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    const username = ctx.message['text'].replace('@', '');

    // TODO: Implement ban logic here
    // 1. Find user by username
    // 2. Check if user exists
    // 3. Check if user is not already banned
    // 4. Update user's status to banned
    // 5. Notify user about ban
    // 6. Send confirmation to admin

    await ctx.reply(`Пользователь @${username} будет забанен.`);
    await ctx.scene.leave();
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = ctx.callbackQuery['data'];

    if (callbackData === 'cancel') {
      await ctx.reply('Операция отменена');
      await ctx.scene.leave();
    }
  }
} 