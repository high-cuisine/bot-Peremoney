import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface RegisterSession {
  name?: string
  phone?: string
  niche?: string
  marketingBudget?: string
  cac?: string
  ltv?: string
  step: 'name' | 'phone' | 'niche' | 'marketingBudget' | 'cac' | 'ltv' | 'confirmation'
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
    await addCancelButton(ctx)
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text
    
    if (await handleCancelButton(ctx, text)) {
      return
    }

    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] as RegisterSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

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
        session.step = 'niche'
        await ctx.replyWithHTML('✅ Отлично! Какая у Вас ниша?')
        break

      case 'niche':
        session.niche = text
        session.step = 'marketingBudget'
        await ctx.replyWithHTML('✅ Отлично! Какой бюджет в месяц закладываете на маркетинг?')
        break

      case 'marketingBudget':
        session.marketingBudget = text
        session.step = 'cac'
        await ctx.replyWithHTML('✅ Отлично! Какой у Вас САС (стоимость привлечения клиента)?')
        break

      case 'cac':
        session.cac = text
        session.step = 'ltv'
        await ctx.replyWithHTML('✅ Отлично! Какой у Вас LTV (доход от одного клиента за всё время)?')
        break

      case 'ltv':
        session.ltv = text
        session.step = 'confirmation'

        // Логируем все данные
        console.log('Registration Data:', {
          name: session.name,
          phone: session.phone,
          niche: session.niche,
          marketingBudget: session.marketingBudget,
          cac: session.cac,
          ltv: session.ltv
        })

        await ctx.replyWithHTML(
          `📝 Пожалуйста, проверьте введенные данные:\n\n` +
          `👤 Имя: <b>${session.name}</b>\n` +
          `📱 Телефон: <b>${session.phone}</b>\n` +
          `🏢 Ниша: <b>${session.niche}</b>\n` +
          `💰 Бюджет на маркетинг: <b>${session.marketingBudget}</b>\n` +
          `💵 САС: <b>${session.cac}</b>\n` +
          `📈 LTV: <b>${session.ltv}</b>\n\n` +
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
