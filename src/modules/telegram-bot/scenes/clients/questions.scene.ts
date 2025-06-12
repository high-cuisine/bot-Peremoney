import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { isNumber } from 'class-validator'
import { UsersService } from 'src/modules/users/users.service'
import { AdminService } from 'src/modules/admin/admin.service'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface QuestionSession {
  step: 'niche' | 'conversion' | 'CAC' | 'LTV' | 'source'
  niche?: string
  conversion?: string
  CAC?: string
  LTV: string
  source: string
}

@Injectable()
@Scene('register')
export class RegisterScene {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService
  ) {}

  @SceneEnter()
  async registerEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      BotMessages.survey.intro
    )
    await addCancelButton(ctx)
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] as QuestionSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    const text = ctx.message['text']

    if (await handleCancelButton(ctx, text)) {
      return
    }

    if(text === '-') {
      switch (session.step) {
        case 'niche':
          session.niche = '-'
          session.step = 'conversion'
          await ctx.replyWithHTML('✅ Пропускаем вопрос о нише. Введите вашу среднюю конверсию:')
          break
        case 'conversion':
          session.conversion = '-'
          session.step = 'CAC'
          await ctx.replyWithHTML('✅ Пропускаем вопрос о конверсии. Введите ваш САС:')
          break
        case 'CAC':
          session.CAC = '-'
          session.step = 'LTV'
          await ctx.replyWithHTML('✅ Пропускаем вопрос о САС. Введите ваш LTV:')
          break
        case 'LTV':
          session.LTV = '-'
          await ctx.replyWithHTML(
            `📝 Пожалуйста, проверьте введенные данные:\n\n` +
            ` Ниша: <b>${session.niche}</b>\n` +
            ` Конверсия: <b>${session.conversion}</b>\n` +
            ` САС: <b>${session.CAC}</b>\n\n` +
            ` САС: <b>${session.LTV}</b>\n\n` +
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
      return
    }

    switch (session.step) {
      case 'niche':
        if (text.length < 2 || text === '-') {
          await ctx.replyWithHTML('❌ Ниша должно содержать минимум 2 символа. Попробуйте еще раз:')
          return
        }
        session.niche = text
        session.step = 'conversion'
        await ctx.replyWithHTML('✅ Отлично! Теперь введите вашу среднюю конверсию:')
        break

      case 'CAC':
        if (isNumber(text.length) || text === '-') {
            await ctx.replyWithHTML('❌ Конверсия должна быть числом. Попробуйте еще раз:')
            return
        }
        session.conversion = text
        session.step = 'LTV'
        await ctx.replyWithHTML('✅ Прекрасно! Теперь введите ваш LTV:')
        break

        case 'conversion':
            if (isNumber(text.length)) {
                await ctx.replyWithHTML('❌ Конверсия должна быть числом. Попробуйте еще раз:')
                return
            }
            session.conversion = text
            session.step = 'CAC'
            await ctx.replyWithHTML('✅ Прекрасно! Теперь введите ваш САС:')
            break

      case 'LTV':
        session.LTV = text

        await ctx.replyWithHTML(
          `📝 Пожалуйста, проверьте введенные данные:\n\n` +
          ` Ниша: <b>${session.niche}</b>\n` +
          ` Конверсия: <b>${session.conversion}</b>\n` +
          ` САС: <b>${session.CAC}</b>\n\n` +
          ` САС: <b>${session.LTV}</b>\n\n` +
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

  @Action('confirm_registration')
  async onConfirm(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }
    const session = ctx.session['register'] as QuestionSession
    
    if (!session) {
      await ctx.scene.leave()
      return
    }

    await this.userService.createUserInfoDates(
      ctx.from.id, 
      true, 
      session.niche, 
      session.conversion, 
      session.source, 
      Number(session.CAC), 
      Number(session.LTV)
    )

    await this.adminService.sendAdminMessage(`
      <b>Пользователь заполнил анкету</b>
      <b>Ниша:</b> ${session.niche}
      <b>Конверсия:</b> ${session.conversion}
      <b>САС:</b> ${session.CAC}
      <b>LTV:</b> ${session.LTV}
      <b>Источник:</b> ${session.source}
    `)

    await ctx.replyWithHTML('✅ Спасибо за ваши ответы!')
    await ctx.scene.leave()

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
    await ctx.reply('Выход из вопросов');
    await ctx.scene.leave();
  }
}
