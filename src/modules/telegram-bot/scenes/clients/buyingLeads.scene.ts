import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { UsersService } from 'src/modules/users/users.service'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'

interface BuyingLeadsSession {
  step: 'quantity' | 'payment'
  quantity?: number
}

@Injectable()
@Scene('buying-leads')
export class BuyingLeadsScene {
  constructor(
    private adminService: AdminService,
    private userService: UsersService
  ) {}

  @SceneEnter()
  async buyingLeadsEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      '👋 Добро пожаловать в раздел покупки лидов!\n\n' +
      'Пожалуйста, введите желаемое количество лидов:'
    )
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'buying-leads') {
      return
    }

    const session = ctx.session['buying-leads'] as BuyingLeadsSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    const text = ctx.message['text']

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
        const price = quantity * 100 // Пример расчета: 100 рублей за лид
        
        await ctx.replyWithHTML(
          `📝 Проверьте детали заказа:\n\n` +
          `Количество лидов: <b>${quantity}</b>\n` +
          `Стоимость: <b>${price} руб.</b>\n\n` +
          `Перейти к оплате?`,
          Markup.inlineKeyboard([
            [
              Markup.button.callback('💳 Оплатить', 'process_payment'),
              Markup.button.callback('❌ Отмена', 'cancel_purchase')
            ]
          ])
        )
        break
    }
  }

  @Action('process_payment')
  async onPayment(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'buying-leads') {
      return
    }

    const session = ctx.session['buying-leads'] as BuyingLeadsSession
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
    if (!ctx.scene || ctx.scene.current.id !== 'buying-leads') {
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
