import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface RegisterSession {
  name?: string
  phone?: string
  step: 'name' | 'phone' | 'confirmation'
}

@Injectable()
@Scene('register')
export class RegisterScene {
  constructor(
  ) {}

  @SceneEnter()
  async registerEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      'Добро пожаловать в процесс регистрации! 👋\n\nПожалуйста, введите ваше имя:'
    )
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
   
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] as RegisterSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    const text = ctx.message['text']

    switch (session.step) {
      case 'name':
        if (text.length < 2) {
          await ctx.replyWithHTML('❌ Имя должно содержать минимум 2 символа. Попробуйте еще раз:')
          return
        }
        session.name = text
        session.step = 'phone'
        await ctx.replyWithHTML('✅ Отлично! Теперь введите ваш номер телефона в формате +7XXXXXXXXXX:')
        break

      case 'phone':
        const phoneRegex = /^\+7\d{10}$/
        if (!phoneRegex.test(text)) {
          await ctx.replyWithHTML(
            '❌ Неверный формат номера телефона. Пожалуйста, используйте формат +7XXXXXXXXXX:'
          )
          return
        }
        session.phone = text
        session.step = 'confirmation'

        await ctx.replyWithHTML(
          `📝 Пожалуйста, проверьте введенные данные:\n\n` +
          `👤 Имя: <b>${session.name}</b>\n` +
          `📱 Телефон: <b>${session.phone}</b>\n\n` +
          `Все верно?`,
          Markup.inlineKeyboard([
            [
              Markup.button.callback('✅ Подтвердить', 'confirm_registration'),
              Markup.button.callback('🔄 Начать заново', 'restart_registration')
            ]
          ])
        )
        break
    }
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
