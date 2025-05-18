import { Update, Start, Hears, Ctx, Action, InjectBot, On } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { UnlinkScene } from './scenes/register.scene';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramBotService: TelegramBotService,
    private readonly unlinkScene: UnlinkScene
  ) {
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    
    console.log('ordinary start');
    await this.telegramBotService.sendBanner(ctx);
  }

  @Action('register')
  async registration(@Ctx() ctx: SceneContext) {
    return ctx.scene.enter('register');
  }

  @On('document')
  async handleDocument(@Ctx() ctx: Context) {
    const message = ctx.message as any;

    if(message && message?.document) {
      await this.telegramBotService.uploadFile(ctx);
    }
}

  @Hears('/my-document')
  async getDocument(@Ctx() ctx:Context) {
    
  }

}
