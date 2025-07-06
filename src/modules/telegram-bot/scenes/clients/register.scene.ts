import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'
import { UsersService } from 'src/modules/users/users.service'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface RegisterSession {
  name?: string
  niche?: string
  source?: string
  step: 'name' | 'niche' | 'source'
}

@Injectable()
@Scene('register')
export class RegisterScene {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService 
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
        session.step = 'niche'
        await ctx.replyWithHTML('✅ Отлично! Какая у тебя ниша?')
        break

      case 'niche':
        session.niche = text
        session.step = 'source'
        await ctx.replyWithHTML(
          '✅ Отлично! Откуда ты о нас узнал?',
          Markup.inlineKeyboard([
            [
              Markup.button.callback('🔍 Поиск Яндекса', 'source_yandex_search'),
              Markup.button.callback('📰 Статья на Дзене', 'source_dzen_article')
            ],
            [
              Markup.button.callback('📢 Реклама в Яндексе', 'source_yandex_ads'),
              Markup.button.callback('📱 Реклама в VK', 'source_vk_ads')
            ],
            [
              Markup.button.callback('📸 Instagram', 'source_instagram'),
              Markup.button.callback('🎵 TikTok', 'source_tiktok')
            ],
            [
              Markup.button.callback('👥 От знакомых', 'source_friends'),
              Markup.button.callback('✏️ Свой вариант', 'source_custom')
            ]
          ])
        )
        break

      case 'source':
        // Если пользователь выбрал "Свой вариант" и отправил текст
        session.source = text
        
        // Логируем все данные
        console.log('Registration Data:', {
          name: session.name,
          niche: session.niche,
          source: session.source
        })

        // Сразу подтверждаем регистрацию
        await this.confirmRegistration(ctx)
        break
    }
  }

  @Action('source_yandex_search')
  async onSourceYandexSearch(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'Поиск Яндекса')
  }

  @Action('source_dzen_article')
  async onSourceDzenArticle(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'Статья на Дзене')
  }

  @Action('source_yandex_ads')
  async onSourceYandexAds(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'Реклама в Яндексе')
  }

  @Action('source_vk_ads')
  async onSourceVkAds(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'Реклама в VK')
  }

  @Action('source_instagram')
  async onSourceInstagram(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'Instagram')
  }

  @Action('source_tiktok')
  async onSourceTiktok(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'TikTok')
  }

  @Action('source_friends')
  async onSourceFriends(@Ctx() ctx: SceneContext) {
    await this.handleSourceSelection(ctx, 'От знакомых')
  }

  @Action('source_custom')
  async onSourceCustom(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] as RegisterSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    session.step = 'source'
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('✏️ Пожалуйста, напишите свой вариант:')
  }

  private async handleSourceSelection(ctx: SceneContext, source: string) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] as RegisterSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    session.source = source

    // Логируем все данные
    console.log('Registration Data:', {
      name: session.name,
      niche: session.niche,
      source: session.source
    })

    await ctx.answerCbQuery()
    
    // Сразу подтверждаем регистрацию
    await this.confirmRegistration(ctx)
  }

  private async confirmRegistration(ctx: SceneContext) {
    const session = ctx.session['register'] as RegisterSession
    
    // Здесь должна быть логика сохранения пользователя в базу данных
    // Пока просто отправляем сообщение об успешной регистрации
    
    await ctx.replyWithHTML(
      `🎉 Поздравляем! Регистрация завершена успешно!\n\n` +
      `👤 Имя: <b>${session.name}</b>\n` +
      `🏢 Ниша: <b>${session.niche}</b>\n` +
      `📋 Источник: <b>${session.source}</b>\n\n` +
      `Добро пожаловать в нашу систему! 🚀`
    )
    const user = await this.usersService.createUser(ctx.from.id, ctx.from.username, new Date(), new Date())
    await this.adminService.sendAdminMessage(`Пользователь ${session.name} зарегистрировался\n` +
    `Имя: ${session.name}\n` +
    `Ниша: ${session.niche}\n` +
    `Источник: ${session.source}\n` +
    `Телеграм: ${ctx.from.id}\n` +
    `Дата регистрации: ${new Date().toLocaleString()}`)
    // Очищаем сессию и выходим из сцены
    delete ctx.session['register']
    await ctx.scene.leave()
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
