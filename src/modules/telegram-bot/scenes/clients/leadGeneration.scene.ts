import { Injectable } from '@nestjs/common'
import { Action, Command, Ctx, Scene, SceneEnter, On } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { SceneContext } from 'telegraf/typings/scenes'
import { BotMessages } from '../../messages/messages'
import { UsersService } from '../../../users/users.service'
import { AdminService } from '../../../admin/admin.service'

//import { BotMessage, getTelegramMessage } from 'src/util/bot_messages'

interface LeadGenerationSession {
  sites?: string[]
  numbers?: string[]
  time_period?: '1_day' | '1_week' | '1_month'
  max_leads?: number
  day_leads_limit?: number
  step: 'sites' | 'numbers' | 'offer' | 'period' | 'limits' | 'daily_limits' | 'launch'
}

@Injectable()
@Scene('lead_generation')
export class LeadGenerationScene {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply(BotMessages.leadGeneration.welcome);
    await ctx.reply('Введите список сайтов через запятую:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: BotMessages.leadGeneration.buttons.skip, callback_data: 'skip_sites' }]
        ]
      }
    });

    ctx.session['leadGeneration'] = {
      step: 'sites'
    };
  }

  @Action('skip_sites')
  async onSkipSites(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    session.step = 'numbers';
    session.sites = [];
    
    await ctx.reply('Введите список номеров телефонов через запятую:', {
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
    session.step = 'offer';
    session.numbers = [];
    
    await ctx.reply(BotMessages.leadGeneration.offerAgreement, {
      reply_markup: {
        inline_keyboard: [
          [{ text: BotMessages.leadGeneration.buttons.agree, callback_data: 'agree_offer' }]
        ]
      }
    });
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    const message = ctx.message as any;
    const text = message.text;

    console.log(session.step);

    switch (session.step) {
      case 'sites':
        console.log(text);
        session.sites = text.split(',').map(site => site.trim()).filter(site => site);
        session.step = 'numbers';
        await ctx.reply('Введите список номеров телефонов через запятую:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: BotMessages.leadGeneration.buttons.skip, callback_data: 'skip_numbers' }]
            ]
          }
        });
        break;

      case 'numbers':
        session.numbers = text.split(',').map(number => number.trim()).filter(number => number);
        session.step = 'offer';
        await ctx.reply(BotMessages.leadGeneration.offerAgreement, {
          reply_markup: {
            inline_keyboard: [
              [{ text: BotMessages.leadGeneration.buttons.agree, callback_data: 'agree_offer' }]
            ]
          }
        });
        break;

      case 'limits':
        session.max_leads = parseInt(text);
        session.step = 'daily_limits';
        await ctx.reply(BotMessages.leadGeneration.enterDailyLimit);
        break;

      case 'daily_limits':
        session.day_leads_limit = parseInt(text);
        session.step = 'launch';
        await ctx.reply(BotMessages.leadGeneration.launch, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: BotMessages.leadGeneration.buttons.back, callback_data: 'back_to_limits' },
                { text: BotMessages.leadGeneration.buttons.launch, callback_data: 'launch_generation' }
              ]
            ]
          }
        });
        break;
    }
  }

  @Action('agree_offer')
  async onAgreeOffer(@Ctx() ctx: SceneContext) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    session.step = 'period';
    
    await ctx.reply(BotMessages.leadGeneration.selectPeriod, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: BotMessages.leadGeneration.buttons.oneDay, callback_data: 'period_1_day' },
            { text: BotMessages.leadGeneration.buttons.oneWeek, callback_data: 'period_1_week' }
          ],
          [{ text: BotMessages.leadGeneration.buttons.oneMonth, callback_data: 'period_1_month' }]
        ]
      }
    });
  }

  @Action(/^period_\d+_(day|week|month)$/)
  async onSelectPeriod(@Ctx() ctx: SceneContext & { match: RegExpExecArray }) {
    const session = ctx.session['leadGeneration'] as LeadGenerationSession;
    const period = ctx.match[0].split('_')[1] + '_' + ctx.match[0].split('_')[2] as '1_day' | '1_week' | '1_month';
    session.time_period = period;
    session.step = 'limits';
    
    await ctx.reply(BotMessages.leadGeneration.enterLeadLimit);
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

    await this.adminService.sendLeadGenerationData(
      session.sites.join(','),
      session.numbers.join(','),
      session.time_period,
      session.max_leads,
      session.day_leads_limit,
      user.username,
      user.username
    );

    await this.usersService.createCompetitor(
      ctx.from.id,
      session.sites.join(','),
      session.numbers.join(',')
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
