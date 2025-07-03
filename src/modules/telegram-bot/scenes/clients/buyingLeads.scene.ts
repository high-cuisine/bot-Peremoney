import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { UsersService } from 'src/modules/users/users.service'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'
import { PaymentService } from 'src/modules/payment/payment.service'

interface BuyingLeadsSession {
  step: 'quantity' | 'payment'
  quantity?: number
}

@Injectable()
@Scene('buying_leads')
export class BuyingLeadsScene {
  constructor(
    private adminService: AdminService,
    private userService: UsersService,
    private paymentService: PaymentService  
  ) {}

  @SceneEnter()
  async buyingLeadsEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      '👋 Добро пожаловать в раздел покупки лидов!\n\n' +
      'Пожалуйста, укажи желаемое количество лидов (только число): '
    )
    await addCancelButton(ctx)
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text
    
    if (await handleCancelButton(ctx, text)) {
      return
    }

    if (!ctx.scene || ctx.scene.current.id !== 'buying_leads') {
      return
    }

    const session = ctx.session['buying_leads'] as BuyingLeadsSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    switch (session.step) {
      case 'quantity':
        const quantity = parseInt(text)
        if (isNaN(quantity) || quantity <= 0) {
          await ctx.replyWithHTML('❌ Пожалуйста, введите корректное число лидов:')
          return
        }
        session.quantity = quantity
        session.step = 'payment'
        
        // Расчет стоимости
        const sale = await this.paymentService.findSale(ctx.from.id);
        const price = quantity * sale // Пример расчета: 100 рублей за лид
        
        await ctx.replyWithHTML(
          `📝 Проверьте детали заказа:\n\n` +
          `Количество лидов: <b>${quantity}</b>\n` +
          `Стоимость: <b>${price} руб.</b>\n\n` +
          `Перейти к оплате?`,
          Markup.inlineKeyboard([
            [
              { text: 'Перейти к оплате', callback_data: `top_up_balance:${price}` },
              { text: 'Отмена', callback_data: 'cancel_purchase' },
            ]
          ])
        )
        break
    }
  }

  @Action('process_payment')
  async onPayment(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'buying_leads') {
      return
    }

    const session = ctx.session['buying_leads'] as BuyingLeadsSession
    if (!session || !session.quantity) {
      await ctx.scene.leave()
      return
    }

    // Здесь будет реальная интеграция с платежной системой
    const paymentLink = 'https://example.com/payment' // Заглушка для демонстрации

    const user = await this.userService.getUserByName(ctx.from.username);

    if(!user) {
        await ctx.scene.leave()
        return;
    }

    await this.adminService.notificationReplenishment({
        ...user,
        telegramId: Number(user.telegramId)
    }, session.quantity);

    await ctx.answerCbQuery()
    await ctx.replyWithHTML(
      `💳 Ссылка для оплаты:\n\n` +
      `<a href="${paymentLink}">Перейти к оплате</a>\n\n` +
      `После успешной оплаты мы свяжемся с вами для уточнения деталей.`
    )
    await ctx.scene.leave()
  }

  @Action('cancel_purchase')
  async onCancel(@Ctx() ctx: SceneContext) {
      if (!ctx.scene || ctx.scene.current.id !== 'buying_leads') {
      return
    }

    await ctx.answerCbQuery()
    await ctx.replyWithHTML('❌ Покупка отменена.')
    await ctx.scene.leave()
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из покупки лидов');
    await ctx.scene.leave();
  }
}
