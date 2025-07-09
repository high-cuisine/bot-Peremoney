import { Injectable } from '@nestjs/common'
import { Action, Ctx, Scene, SceneEnter, On, Command, Hears } from 'nestjs-telegraf'
import { AdminService } from 'src/modules/admin/admin.service'
import { ExelService } from 'src/modules/Exel-Module/exelModule.service'
import { SceneContext } from 'telegraf/typings/scenes'
import { TelegramBotService } from '../../telegram-bot.service'
import { UsersService } from 'src/modules/users/users.service'
import { Markup } from 'telegraf'
import { BotMessages } from '../../messages/messages'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'
import { LeadsSignal } from 'src/modules/leads/dto/leads.dto'
import { LeadsService } from 'src/modules/leads/leads.service'

interface LoadLeadsSession {
  username?: string
  documentId?: string
  step: 'username' | 'document'
}

@Injectable()
@Scene('load_leads')
export class LoadLeadsScene {

  constructor(
    private adminService: AdminService,
    private exelService: ExelService,
    private telegramService: TelegramBotService,
    private userService: UsersService,
    private leadsService: LeadsService
  ) {}

  @SceneEnter()
  async loadLeadsEnter(@Ctx() ctx: SceneContext) {
    await ctx.replyWithHTML(
      '📋 <b>Загрузка лидов</b>\n\n' +
      'Эта функция позволяет загрузить лиды для пользователя через Excel файл.\n\n' +
      '👤 <b>Шаг 1:</b> Введите никнейм пользователя без @:'
    )

    const session = ctx.session['load_leads'] as LoadLeadsSession;
    if (!session) {
      ctx.session['load_leads'] = { step: 'username' };
    } else {
      session.step = 'username';
    }
    await addCancelButton(ctx);
  }

  @On('text')
  async onMessage(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    if (!ctx.scene || ctx.scene.current.id !== 'load_leads') {
      return
    }

    const session = ctx.session['load_leads'] as LoadLeadsSession
    if (!session) {
      ctx.session['load_leads'] = { step: 'username' };
      await ctx.scene.leave()
      return
    }

    switch (session.step) {
      case 'username':
        if (text.length < 2) {
          await ctx.replyWithHTML('❌ Имя должно содержать минимум 2 символа. Попробуйте еще раз:')
          return
        }
        
        // Проверяем существование пользователя
        const user = await this.userService.getUserByName(text);
        if (!user) {
          await ctx.replyWithHTML('❌ Пользователь с таким никнеймом не найден. Попробуйте еще раз:')
          return
        }
        
        session.username = text
        session.step = 'document'
        await ctx.replyWithHTML(
          '✅ Отлично! Пользователь найден.\n\n' +
          '📋 Теперь загрузите Excel файл с лидами.\n\n' +
          '📝 <b>Формат файла должен содержать следующие колонки:</b>\n' +
          '• <b>phone</b> - номер телефона (например: +7XXXXXXXXXX)\n' +
          '• <b>project</b> - название проекта\n' +
          '• <b>source</b> - источник лида\n' +
          '• <b>sub2</b> - дополнительная информация\n\n' +
          '📤 <b>Отправьте Excel файл (.xlsx или .xls):</b>'
        )
        break

      default:
        await ctx.scene.leave()
        break
    }
  }

  @On('document')
  async handleDocument(@Ctx() ctx: SceneContext) {
    const message = ctx.message as any;

    if (!message || !message?.document) {
      await ctx.replyWithHTML('❌ Пожалуйста, загрузите Excel файл.')
      return;
    }

    const session = ctx.session['load_leads'] as LoadLeadsSession;
    
    if (!session || session.step !== 'document') {
      await ctx.replyWithHTML('❌ Ошибка сессии. Начните заново.')
      await ctx.scene.leave()
      return;
    }

    try {
      // Получаем информацию о документе
      const document = message.document;
      const fileId = document.file_id;
      const fileName = document.file_name;
      
      // Проверяем, что это Excel файл
      if (!fileName.toLowerCase().endsWith('.xlsx') && !fileName.toLowerCase().endsWith('.xls')) {
        await ctx.replyWithHTML('❌ Пожалуйста, загрузите файл в формате Excel (.xlsx или .xls)')
        return;
      }

      // Получаем ссылку на файл и загружаем его
      const fileLink = await ctx.telegram.getFileLink(fileId);
      const response = await fetch(fileLink);
      const fileBuffer = await response.arrayBuffer();
      
      // Читаем Excel файл с типом LeadsSignal
      const leadsData = await this.exelService.readLeadsSignalExcel(Buffer.from(fileBuffer));
      
      await this.leadsService.saveLeadsSignalArray(leadsData);

      await ctx.replyWithHTML(
        `✅ <b>Лиды успешно загружены!</b>\n\n` +
        `👤 Пользователь: <b>${session.username}</b>\n` +
        `📁 Файл: <b>${fileName}</b>\n` +
        `📊 Количество лидов: <b>${leadsData.length}</b>\n\n` +
        `📝 Информация записана в логи.`
      );

      await ctx.scene.leave()
      
    } catch (error) {
      console.error('Ошибка при обработке Excel файла:', error);
      await ctx.replyWithHTML('❌ Произошла ошибка при обработке файла. Попробуйте еще раз.')
    }
  }

  @Action('cancel')
  async onCancel(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'load_leads') {
      return
    }

    await ctx.replyWithHTML('❌ Загрузка лидов отменена.')
    await ctx.scene.leave()
  }
} 