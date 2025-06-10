import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { UserBotsService } from 'src/user-bots/user-bots.service';

interface CreateUserbotSession {
  step: 'phone' | 'apiId' | 'apiHash' | 'password' | 'waiting_code' | 'code';
  phone?: string;
  apiId?: string;
  apiHash?: string;
  password?: string;
}

@Injectable()
@Scene('create_userbot')
export class CreateUserbotScene {
  constructor(
    private readonly userBotsService: UserBotsService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    // Initialize session if it doesn't exist
    if (!ctx.session['createUserbot']) {
      ctx.session['createUserbot'] = {} as CreateUserbotSession;
    }
    
    const session = ctx.session['createUserbot'] as CreateUserbotSession;
    session.step = 'phone';
    
    await ctx.reply(
      'Введите номер телефона для создания юзербота (в формате +7XXXXXXXXXX):'
    );
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    // Initialize session if it doesn't exist
    if (!ctx.session['createUserbot']) {
      ctx.session['createUserbot'] = {} as CreateUserbotSession;
    }
    
    const session = ctx.session['createUserbot'] as CreateUserbotSession;
    const text = (ctx.message as any).text;

    switch (session.step) {
      case 'phone':
        // Проверка формата телефона
        const phoneRegex = /^\+\d{11}$/;
        if (!phoneRegex.test(text)) {
          await ctx.reply('Неверный формат номера телефона. Пожалуйста, введите номер в формате +7XXXXXXXXXX');
          return;
        }
        session.phone = text;
        session.step = 'apiId';
        await ctx.reply('Введите API ID (получите на https://my.telegram.org):');
        break;

      case 'apiId':
        if (!/^\d+$/.test(text)) {
          await ctx.reply('API ID должен содержать только цифры. Пожалуйста, введите корректный API ID');
          return;
        }
        session.apiId = text;
        session.step = 'apiHash';
        await ctx.reply('Введите API Hash (получите на https://my.telegram.org):');
        break;

      case 'apiHash':
        if (!/^[a-f0-9]{32}$/i.test(text)) {
          await ctx.reply('Неверный формат API Hash. Пожалуйста, введите корректный API Hash');
          return;
        }
        session.apiHash = text;
        session.step = 'password';
        await ctx.reply('Введите пароль от аккаунта:');
        break;

      case 'password':
        session.password = text;
        session.step = 'waiting_code';
        try {
          await this.userBotsService.sendCode(session.phone, parseInt(session.apiId), session.apiHash);
          await ctx.reply(
            'Пароль принят. Теперь на аккаунт придет код подтверждения. ' +
            'Пожалуйста, введите код, когда он придет:',
            Markup.inlineKeyboard([
              [Markup.button.callback('Отменить создание', 'cancel_userbot')]
            ])
          );
        } catch (error) {
          if (error.message.includes('Code was already sent')) {
            await ctx.reply(
              'Код уже был отправлен на этот номер. Пожалуйста, введите полученный код или подождите 5 минут перед повторной попыткой.',
              Markup.inlineKeyboard([
                [Markup.button.callback('Отменить создание', 'cancel_userbot')]
              ])
            );
          } else {
            await ctx.reply('Произошла ошибка при отправке кода. Попробуйте еще раз.');
            session.step = 'password';
          }
        }
        break;

      case 'waiting_code':
        const codeRegex = /^\d{5}$/;
        if (!codeRegex.test(text)) {
          await ctx.reply('Неверный формат кода. Пожалуйста, введите 5 цифр кода подтверждения');
          return;
        }
        
        try {
          await this.userBotsService.login(session.phone, session.password, text, parseInt(session.apiId), session.apiHash);
          await ctx.reply('Юзербот успешно создан!');
          await ctx.scene.leave();
        } catch (error) {
          await ctx.reply('Произошла ошибка при создании юзербота. Попробуйте еще раз.');
          await ctx.scene.leave();
        }
        break;
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const callbackData = (ctx.callbackQuery as any).data;

    if (callbackData === 'cancel_userbot') {
      await ctx.reply('Создание юзербота отменено.');
      await ctx.scene.leave();
    }
  }
} 