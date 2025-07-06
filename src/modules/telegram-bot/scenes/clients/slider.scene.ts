import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { createReadStream } from 'fs'
import { join } from 'path'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'

interface SliderSession {
  currentIndex: number
  images: string[]
  captions: string[]
  actionButtonText: string
  actionButtonCallback: string
}

@Injectable()
@Scene('slider')
export class SliderScene {
  private readonly images = [
    'free.png',
    'kids.png', 
    'adult.png',
    'epic.png',
    'space.png',
    'beyond.png'
  ]

  private readonly captions = [
    '🆓 <b>Бесплатный тариф</b>\n\n✅ Телефонные номера клиентов конкурентов\n❌ Деанонимизация (обогащение данных)\n❌ Промо-рассылки в Telegram\n❌ Инвайтинг в Telegram\n❌ Обзвон контактов ИИ-роботом\n❌ СМС-рассылки\n❌ Настройка точечной рекламы\n❌ Интеграция с CRM-системой\n❌ Глубокая аналитика',
    
    '👶 <b>Тариф Kids</b>\n\n✅ Телефонные номера клиентов конкурентов\n✅ Промо-рассылки в Telegram\n✅ Инвайтинг в Telegram\n✅ Обзвон контактов ИИ-роботом\n✅ СМС-рассылки\n✅ Настройка точечной рекламы в Директе, VK и Telegram\n❌ Интеграция с CRM-системой\n❌ Глубокая аналитика',
    
    '👨‍💼 <b>Тариф Adult</b>\n\n✅ Телефонные номера клиентов конкурентов\n✅ Промо-рассылки в Telegram\n✅ Инвайтинг в Telegram\n✅ Обзвон контактов ИИ-роботом\n✅ СМС-рассылки\n✅ Настройка точечной рекламы в Директе, VK и Telegram\n✅ Интеграция с CRM-системой\n❌ Глубокая аналитика',
    
    '🚀 <b>Тариф Epic</b>\n\n✅ Телефонные номера клиентов конкурентов\n✅ Промо-рассылки в Telegram\n✅ Инвайтинг в Telegram\n✅ Обзвон контактов ИИ-роботом\n✅ СМС-рассылки\n✅ Настройка точечной рекламы в Директе, VK и Telegram\n✅ Интеграция с CRM-системой\n✅ Глубокая аналитика\n✅ Приоритетная поддержка',
    
    '🌌 <b>Тариф Space</b>\n\n✅ Телефонные номера клиентов конкурентов\n✅ Промо-рассылки в Telegram\n✅ Инвайтинг в Telegram\n✅ Обзвон контактов ИИ-роботом\n✅ СМС-рассылки\n✅ Настройка точечной рекламы в Директе, VK и Telegram\n✅ Интеграция с CRM-системой\n✅ Глубокая аналитика\n✅ Приоритетная поддержка\n✅ Персональный менеджер',
    
    '⭐ <b>Тариф Beyond</b>\n\n✅ Телефонные номера клиентов конкурентов\n✅ Промо-рассылки в Telegram\n✅ Инвайтинг в Telegram\n✅ Обзвон контактов ИИ-роботом\n✅ СМС-рассылки\n✅ Настройка точечной рекламы в Директе, VK и Telegram\n✅ Интеграция с CRM-системой\n✅ Глубокая аналитика\n✅ Приоритетная поддержка\n✅ Персональный менеджер\n✅ Белый лейбл'
  ]

  @SceneEnter()
  async sliderEnter(@Ctx() ctx: SceneContext) {
    // Инициализируем сессию слайдера
    const session: SliderSession = {
      currentIndex: 0,
      images: this.images,
      captions: this.captions,
      actionButtonText: 'Выбрать тариф',
      actionButtonCallback: 'select_rate'
    }

    ctx.session['slider'] = session

    await this.showCurrentSlide(ctx)
  }

  @Action('slider_prev')
  async onPrevSlide(@Ctx() ctx: SceneContext) {
    const session = ctx.session['slider'] as SliderSession
    if (!session) return

    session.currentIndex = session.currentIndex > 0 
      ? session.currentIndex - 1 
      : session.images.length - 1

    await this.showCurrentSlide(ctx)
  }

  @Action('slider_next')
  async onNextSlide(@Ctx() ctx: SceneContext) {
    const session = ctx.session['slider'] as SliderSession
    if (!session) return

    session.currentIndex = session.currentIndex < session.images.length - 1 
      ? session.currentIndex + 1 
      : 0

    await this.showCurrentSlide(ctx)
  }

  @Action('slider_select')
  async onSelectSlide(@Ctx() ctx: SceneContext) {
    const session = ctx.session['slider'] as SliderSession
    if (!session) return

    const selectedRate = this.getRateNameByIndex(session.currentIndex)
    
    await ctx.answerCbQuery()
    await ctx.replyWithHTML(
      `✅ Вы выбрали тариф: <b>${selectedRate}</b>\n\n` +
      `Для оформления подписки свяжитесь с нашим менеджером: @Peremoney_Support`
    )
    
    // Выходим из сцены слайдера
    await ctx.scene.leave()
  }

  @Action('slider_cancel')
  async onCancel(@Ctx() ctx: SceneContext) {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('❌ Просмотр тарифов отменен')
    await ctx.scene.leave()
  }

  private async showCurrentSlide(ctx: SceneContext) {
    const session = ctx.session['slider'] as SliderSession
    if (!session) return

    const imagePath = join(__dirname, '..', '..', '..', '..', 'assets', 'rates', session.images[session.currentIndex])
    const photoStream = createReadStream(imagePath)

    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback('⬅️ Назад', 'slider_prev'),
        Markup.button.callback('Далее ➡️', 'slider_next')
      ],
      [
        Markup.button.callback(session.actionButtonText, 'slider_select')
      ],
      [
        Markup.button.callback('❌ Отмена', 'slider_cancel')
      ]
    ])

    // Если это первое изображение, отправляем новое сообщение
    if (session.currentIndex === 0) {
      await ctx.replyWithPhoto(
        { source: photoStream },
        {
          caption: session.captions[session.currentIndex],
          parse_mode: 'HTML',
          reply_markup: keyboard.reply_markup
        }
      )
    } else {
      // Иначе редактируем предыдущее сообщение
      try {
        await ctx.editMessageMedia({
          type: 'photo',
          media: { source: photoStream },
          caption: session.captions[session.currentIndex],
          parse_mode: 'HTML'
        })
        await ctx.editMessageReplyMarkup(keyboard.reply_markup)
      } catch (error) {
        // Если не удалось отредактировать, отправляем новое сообщение
        await ctx.replyWithPhoto(
          { source: photoStream },
          {
            caption: session.captions[session.currentIndex],
            parse_mode: 'HTML',
            reply_markup: keyboard.reply_markup
          }
        )
      }
    }
  }

  private getRateNameByIndex(index: number): string {
    const rateNames = [
      'Бесплатный',
      'Kids', 
      'Adult',
      'Epic',
      'Space',
      'Beyond'
    ]
    return rateNames[index] || 'Неизвестный тариф'
  }
} 