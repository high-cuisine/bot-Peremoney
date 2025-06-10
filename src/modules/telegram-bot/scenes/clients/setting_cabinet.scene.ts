import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter, On, Command } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

interface CabinetSettingsSession {
  step: 'company_name' | 'contact_person' | 'phone' | 'email' | 'website' | 'address' | 'description' | 'confirm';
  company_name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  description?: string;
}

@Injectable()
@Scene('setting_cabinet')
export class SettingCabinetScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    if (!ctx.session['cabinetSettings']) {
      ctx.session['cabinetSettings'] = {} as CabinetSettingsSession;
    }
    
    const session = ctx.session['cabinetSettings'] as CabinetSettingsSession;
    session.step = 'company_name';
    
    await ctx.reply(
      'Давайте настроим ваш кабинет!\n\n' +
      'Пожалуйста, введите название вашей компании:',
      Markup.inlineKeyboard([
        [Markup.button.callback('Пропустить', 'skip_company_name')]
      ])
    );
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const session = ctx.session['cabinetSettings'] as CabinetSettingsSession;
    const text = (ctx.message as any).text;

    switch (session.step) {
      case 'company_name':
        session.company_name = text;
        session.step = 'contact_person';
        await ctx.reply(
          'Отлично! Теперь введите имя контактного лица:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_contact_person')]
          ])
        );
        break;

      case 'contact_person':
        session.contact_person = text;
        session.step = 'phone';
        await ctx.reply(
          'Введите номер телефона:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_phone')]
          ])
        );
        break;

      case 'phone':
        session.phone = text;
        session.step = 'email';
        await ctx.reply(
          'Введите email:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_email')]
          ])
        );
        break;

      case 'email':
        session.email = text;
        session.step = 'website';
        await ctx.reply(
          'Введите адрес вашего сайта:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_website')]
          ])
        );
        break;

      case 'website':
        session.website = text;
        session.step = 'address';
        await ctx.reply(
          'Введите адрес компании:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_address')]
          ])
        );
        break;

      case 'address':
        session.address = text;
        session.step = 'description';
        await ctx.reply(
          'Введите краткое описание вашей компании:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_description')]
          ])
        );
        break;

      case 'description':
        session.description = text;
        session.step = 'confirm';
        await this.showConfirmation(ctx);
        break;
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: SceneContext) {
    const session = ctx.session['cabinetSettings'] as CabinetSettingsSession;
    const callbackData = (ctx.callbackQuery as any).data;

    switch (callbackData) {
      case 'skip_company_name':
        session.company_name = null;
        session.step = 'contact_person';
        await ctx.reply(
          'Введите имя контактного лица:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_contact_person')]
          ])
        );
        break;

      case 'skip_contact_person':
        session.contact_person = null;
        session.step = 'phone';
        await ctx.reply(
          'Введите номер телефона:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_phone')]
          ])
        );
        break;

      case 'skip_phone':
        session.phone = null;
        session.step = 'email';
        await ctx.reply(
          'Введите email:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_email')]
          ])
        );
        break;

      case 'skip_email':
        session.email = null;
        session.step = 'website';
        await ctx.reply(
          'Введите адрес вашего сайта:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_website')]
          ])
        );
        break;

      case 'skip_website':
        session.website = null;
        session.step = 'address';
        await ctx.reply(
          'Введите адрес компании:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_address')]
          ])
        );
        break;

      case 'skip_address':
        session.address = null;
        session.step = 'description';
        await ctx.reply(
          'Введите краткое описание вашей компании:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Пропустить', 'skip_description')]
          ])
        );
        break;

      case 'skip_description':
        session.description = null;
        session.step = 'confirm';
        await this.showConfirmation(ctx);
        break;

      case 'confirm_settings':
        await this.saveSettings(ctx);
        break;

      case 'edit_settings':
        session.step = 'company_name';
        await ctx.scene.reenter();
        break;
    }
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из настройки кабинета');
    await ctx.scene.leave();
  }

  private async showConfirmation(@Ctx() ctx: SceneContext) {
    const session = ctx.session['cabinetSettings'] as CabinetSettingsSession;
    
    const confirmationText = 
      'Проверьте введенные данные:\n\n' +
      `Название компании: ${session.company_name || 'Не указано'}\n` +
      `Контактное лицо: ${session.contact_person || 'Не указано'}\n` +
      `Телефон: ${session.phone || 'Не указан'}\n` +
      `Email: ${session.email || 'Не указан'}\n` +
      `Сайт: ${session.website || 'Не указан'}\n` +
      `Адрес: ${session.address || 'Не указан'}\n` +
      `Описание: ${session.description || 'Не указано'}\n\n` +
      'Все верно?';

    await ctx.reply(
      confirmationText,
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Подтвердить', 'confirm_settings'),
          Markup.button.callback('Изменить', 'edit_settings')
        ]
      ])
    );
  }

  private async saveSettings(@Ctx() ctx: SceneContext) {
    const session = ctx.session['cabinetSettings'] as CabinetSettingsSession;
    
    // Выводим все данные в консоль
    console.log('Настройки кабинета:', {
      company_name: session.company_name,
      contact_person: session.contact_person,
      phone: session.phone,
      email: session.email,
      website: session.website,
      address: session.address,
      description: session.description
    });

    await ctx.reply('Настройки кабинета успешно сохранены!');
    await ctx.scene.leave();
  }

} 