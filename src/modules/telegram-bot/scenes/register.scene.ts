
import { Injectable } from '@nestjs/common'
import { Action, Ctx, Hears, Next, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

@Injectable()
@Scene('register')
export class UnlinkScene {
  constructor() {}
  @SceneEnter()
  async unlinkEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      'getTelegramMessage(BotMessage.UNLINK)',
      Markup.inlineKeyboard([
        Markup.button.callback('Да', 'unlink'),
        Markup.button.callback('Нет', 'link')
      ])
    )
  }

  @Action('unlink')
  async unlinking(
    @Ctx() ctx: SceneContext,
    @Next() next: () => ParameterDecorator
  ) {
    console.log('unlinking')
    //await this.appService.unlinkUser((ctx.update as any).callback_query.from.id)
    await ctx.replyWithHTML('getTelegramMessage(BotMessage.UNLINK_YES)')
    next()
  }

  @Action('link')
  async linking(
    @Ctx() ctx: SceneContext,
    @Next() next: () => ParameterDecorator
  ) {
    console.log('linking')
    await ctx.replyWithHTML('getTelegramMessage(BotMessage.UNLINK_NO)')
    next()
  }
}