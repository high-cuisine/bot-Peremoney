import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { Markup, session } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { UsersService } from 'src/modules/users/users.service'
import { BotMessages } from '../../messages/messages'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface LoadCRMSession {
  key?: string
  type?: 'amo' | 'bitrix'
  step: 'key' | 'type'
}

@Injectable()
@Scene('load_crm')
export class LoadCRMScene {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @SceneEnter()
  async registerEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
        `Выберите вашу CRM систему из списка ниже`,
        Markup.inlineKeyboard([
          [
            Markup.button.callback('Bitrix24', 'bitrix24'),
            Markup.button.callback('AmoCRM', 'amocrm')
          ]
        ])
      )
    await addCancelButton(ctx)
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text
    
    if (await handleCancelButton(ctx, text)) {
      return
    }

    if (!ctx.scene || ctx.scene.current.id !== 'load_crm') {
      return
    }

    const session = ctx.session['load_crm'] as LoadCRMSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    switch (session.step) {
      case 'key':
        session.key = text
        await ctx.replyWithHTML(`
            Вы успешно загрузили ваш ключ API для ${session.type}
            <code>${session.key}</code>
        `, Markup.inlineKeyboard([
            [
                Markup.button.callback('В меню', 'start')
            ]
        ]))
        await this.usersService.saveUserCRM(ctx.from.id, session.key, session.type)
        await ctx.scene.leave()
        break
    }
  }

  @Action('bitrix24')
  async onBitrix24(@Ctx() ctx: SceneContext) {
    const session = ctx.session['load_crm'] as LoadCRMSession
    await ctx.replyWithHTML('Вы выбрали Bitrix24. \n\nВведите ваш ключ API:')
    session.type = 'bitrix'
    session.step = 'key'
  }

  @Action('amocrm')
  async onAmoCRM(@Ctx() ctx: SceneContext) {
    const session = ctx.session['load_crm'] as LoadCRMSession
    await ctx.replyWithHTML('Вы выбрали AmoCRM. \n\nВведите ваш ключ API:')

    session.type = 'amo'
    session.step = 'key'
  }

  @Action('restart_registration')
  async onRestart(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    // Реинициализируем сессию
    ctx.session['register'] = {
      step: 'name'
    }

    await ctx.answerCbQuery()
    await ctx.scene.reenter()
  }

  @Action('cancel')
  async onCancel(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    await ctx.replyWithHTML('❌ Регистрация отменена.')
    await ctx.scene.leave()
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из регистрации');
    await ctx.scene.leave();
  }
}