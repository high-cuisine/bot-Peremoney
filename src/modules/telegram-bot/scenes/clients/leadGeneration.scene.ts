import { Injectable } from '@nestjs/common'
import { Action, Command, Ctx, Scene, SceneEnter, On, Hears } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { UsersService } from '../../../users/users.service'
import { AdminService } from '../../../admin/admin.service'
import { OrdersService } from 'src/modules/users/orders.service'
import { addCancelButton, handleCancelButton } from '../../helpers/scene.helper'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface LeadGenerationSession {
  sites?: string[]
  numbers?: string[]
  region?: string
  max_leads?: number
  day_leads_limit?: number
  company_name?: string
  step: 'sites' | 'numbers' | 'company' | 'region' | 'limits' | 'daily_limits' | 'launch',
}

@Injectable()
@Scene('lead_generation')
export class LeadGenerationScene {
  // Available regions for lead generation
  private readonly regions = [
    { text: 'Москва', value: 'moscow' },
    { text: 'Санкт-Петербург', value: 'spb' },
    { text: 'Вся Россия', value: 'russia' }
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly ordersService: OrdersService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply(BotMessages.leadGeneration.welcome);
    await ctx.reply('Введите список сайтов каждый с новой строки:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: BotMessages.leadGeneration.buttons.skip, callback_data: 'skip_sites' }]
        ]
      }
    });

    ctx.session['leadGeneration'] = {
      step: 'sites'
    };
    await addCancelButton(ctx);
  }

  @Action('skip_sites')
  async onSkipSites(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    session.step = 'numbers';
    session.sites = [];
    
    await ctx.reply('Введите список номеров телефонов без запятых в столбик:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: BotMessages.leadGeneration.buttons.skip, callback_data: 'skip_numbers' }]
        ]
      }
    });
  }

  @Action('skip_numbers')
  async onSkipNumbers(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    session.step = 'company';
    session.numbers = [];
    
    await ctx.reply('Введите название вашей компании:');
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const text = (ctx.message as any).text;
    
    if (await handleCancelButton(ctx, text)) {
      return;
    }

    const session = ctx.session['leadGeneration'] as LeadGenerationSession;

    console.log(session.step);

    switch (session.step) {
      case 'sites':
        console.log(text);
        session.sites = text;
        session.step = 'numbers';
        await ctx.reply('Введите список номеров телефонов (каждый с новой строки):', {
          reply_markup: {
            inline_keyboard: [
              [{ text: BotMessages.leadGeneration.buttons.skip, callback_data: 'skip_numbers' }]
            ]
          }
        });
        break;

      case 'numbers':
        session.numbers = text;
        session.step = 'company';
        await ctx.reply('Введите название вашей компании:');
        break;

      case 'company':
        session.company_name = text.trim();
        session.step = 'region';
        await ctx.reply('Введите регион для перехвата лидов:');
        break;

      case 'region':
        session.region = text.trim();
        session.step = 'limits';
        await ctx.reply(BotMessages.leadGeneration.enterLeadLimit);
        break;

      case 'limits':
        const maxLeads = parseInt(text);
        if (isNaN(maxLeads) || maxLeads <= 0) {
          await ctx.reply('Пожалуйста, введите корректное число лидов (больше 0)');
          return;
        }
        session.max_leads = maxLeads;
        session.step = 'daily_limits';
        await ctx.reply(BotMessages.leadGeneration.enterDailyLimit);
        break;

      case 'daily_limits':
        const dailyLimit = parseInt(text);
        if (isNaN(dailyLimit) || dailyLimit <= 0) {
          await ctx.reply('Пожалуйста, введите корректное число для дневного лимита (больше 0)');
          return;
        }
        session.day_leads_limit = dailyLimit;
        session.step = 'launch';
        await ctx.reply(BotMessages.leadGeneration.launch, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: BotMessages.leadGeneration.buttons.back, callback_data: 'back_to_limits' },
              ],
              [{ text: BotMessages.leadGeneration.buttons.launch, callback_data: 'launch_generation' }]
            ]
          }
        });
        break;
    }
  }

  @Action('back_to_limits')
  async onBackToLimits(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    session.step = 'limits';
    delete session.max_leads;
    delete session.day_leads_limit;
    
    await ctx.reply(BotMessages.leadGeneration.enterLeadLimit);
  }

  @Action('launch_generation')
  async onLaunchGeneration(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    const user = await this.usersService.getUserByTelegramId(ctx.from.id);

    const companyName = session.company_name + '.' + user.username;

    console.log(String(session.sites));

    await this.adminService.sendLeadGenerationData(
      String(session.sites),
      String(session.numbers),
      session.region,
      session.max_leads,
      session.day_leads_limit,
      user.username,
      user.username,
      companyName
    );

    const competitor = await this.usersService.createCompetitor(
      ctx.from.id,
      session.sites.join(','),
      session.numbers.join(',')
    );

    await this.ordersService.createLeadGeneration(
      user.id,
      competitor.id,
      session.max_leads,
      session.day_leads_limit,
      companyName
    );

    await ctx.reply('Настройки сохранены. Система будет настроена в течение 24 часов.', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Обратно в меню', callback_data: 'start' }]
        ]
      }
    });
    await ctx.scene.leave();
  }

  @Command('exit')
  async onExit(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выход из настройки генерации лидов');
    await ctx.scene.leave();
  }
}
