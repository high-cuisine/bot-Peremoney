import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { ExelService } from 'src/modules/Exel-Module/exelModule.service'
import { SceneContext } from 'telegraf/typings/scenes'
import { TelegramBotService } from '../../telegram-bot.service'
import { UsersService } from 'src/modules/users/users.service'

interface RegisterSession {
  username?: string
  documentId?: string
  step: 'username' | 'documentId'
}

@Injectable()
@Scene('sendUserExelDeAnonymization')
export class LoadUserExelDeanonymization {

  constructor(
    private adminService: AdminService,
    private exelSerice: ExelService,
    private telegramService: TelegramBotService,
    private userService: UsersService
  ) {}

  @SceneEnter()
  async registerEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      'ВВедите имя пользователя без @:'
    )

    const session = await ctx.session['sendUserExelDeAnonymization'] as RegisterSession;
    session.step = 'username'
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
   
    if (!ctx.scene || ctx.scene.current.id !== 'sendUserExelDeAnonymization') {
      return
    }

    const session = ctx.session['sendUserExelDeAnonymization'] as RegisterSession
    if (!session) {
      await ctx.scene.leave()
      return
    }

    const text = ctx.message['text']

    switch (session.step) {
      case 'username':
        if (text.length < 2) {
          await ctx.replyWithHTML('❌ Имя должно содержать минимум 2 символа. Попробуйте еще раз:')
          return
        }
        session.username = text
        session.step = 'documentId'
        await ctx.replyWithHTML('✅ Отлично! Теперь введите ваш номер телефона в формате +7XXXXXXXXXX:')
        break

        default:
          await ctx.scene.leave()
          break
    }
    
  }

  @On('document')
  async handleDocument(@Ctx() ctx: SceneContext) {
    const message = ctx.message as any;

    

    if(message && message?.document) {
      const session = ctx.session['sendUserExelDeAnonymization'] as RegisterSession
      const user = await this.userService.getUserByName(session.username);

      if(!user) {
        await ctx.reply('введите коректный никнейм клиента');
        return;
      }

      let buffer: any;

      if(user.rate === 'pro') {
        const emails = await this.adminService.sendUserExelAnonymization(session.username, [{email:'1sandefa2@gmail.com'}]);
        buffer = await this.exelSerice.exportToExcelBuffer(emails);
      }
      else {
        buffer = await this.exelSerice.exportToExcelBuffer([{email:'1sandefa2@gmail.com'}]);
      }
      
      await this.telegramService.sendDocumentBuffer(
        Number(user.telegramId), 
        Buffer.from(buffer),
        { filename: 'valid_emails.xlsx' }
      );

      await ctx.scene.leave()
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
}
