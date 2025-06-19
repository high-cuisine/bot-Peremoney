import { Update, Start, Hears, Ctx, Action, InjectBot, On, Next } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { RegisterScene } from './scenes/clients/register.scene';
import { LeadGenerationScene } from './scenes/clients/leadGeneration.scene';
import { SceneContext } from 'telegraf/typings/scenes';
import { BotMessages } from './messages/messages';
import { UsersService } from '../users/users.service';
import { AdminService } from '../admin/admin.service';
import { BannedMiddleware } from './middleware/banned.middleware';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context> & any,
    private readonly telegramBotService: TelegramBotService,
    private readonly registerScene: RegisterScene,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly leadGenerationScene: LeadGenerationScene,
    private readonly bannedMiddleware: BannedMiddleware
  ) {
    // Apply banned middleware to all updates
    this.bot.use(this.bannedMiddleware.use.bind(this.bannedMiddleware));
  }

  @Start()
  @Hears('Обновить бота')
  @Action('start')
  async onStart(@Ctx() ctx: Context) {
    await this.telegramBotService.sendBanner(ctx);
  }

  @Action('register')
  async registration(@Ctx() ctx: SceneContext) {
    // Инициализируем сессию для регистрации
    ctx.session['register'] = {
      step: 'name'
    }
    
    // Входим в сцену регистрации
    return ctx.scene.enter('register');

  }

  @On('document')
  async handleDocument(@Ctx() ctx: Context) {
    const message = ctx.message as any;

    if(message && message?.document) {
      await this.telegramBotService.uploadFile(ctx);
    }
}

  @Hears('/my-document')
  async getDocument(@Ctx() ctx:Context) {
    
  }

  @Action('confirm_registration')
  async onConfirm(@Ctx() ctx: SceneContext) {
    if (!ctx.scene || ctx.scene.current.id !== 'register') {
      return
    }

    const session = ctx.session['register'] 
    if (!session) {
      await ctx.scene.leave()
      return
    }

    await this.userService.createUser(ctx.from.id, ctx.from.username, new Date(), new Date());

    await this.adminService.notifyManager(BotMessages.manager.newUser(ctx.from.username, ctx.session['register'].phone, ctx.session['register'].email));

    await ctx.replyWithHTML(BotMessages.register.success)
    await ctx.scene.leave()

    await this.telegramBotService.sendSupportMessage(ctx.from.id);

    await this.telegramBotService.sendMessageFreeBanner(ctx);
  }

  @Action('confirm_subscription')
  async onConfirmSubscription(@Ctx() ctx: Context) {
    await this.telegramBotService.checkSubscription(ctx);
  }

  @Hears('Подписка')
  @Action('tarifs')
  async onRates(@Ctx() ctx: Context) {
    await this.telegramBotService.sendRates(ctx);
  }

  @Action('tariff_mini')
  async onTariffMini(@Ctx() ctx: Context) {
    await this.telegramBotService.sendTariffMini(ctx);
  }

  @Action('tariff_pro')
  async onTariffPro(@Ctx() ctx: Context) {
    await this.telegramBotService.sendTariffPro(ctx);
  }

  @Hears('Перехват лидов')
  @Action('lead_generation')
  async onLeadGeneration(@Ctx() ctx: Context) {
    await this.telegramBotService.sendLeadsMenu(ctx);
  }

  @Action('start_lead_generation')
  async onStartLeadGeneration(@Ctx() ctx: SceneContext) {
    ctx.session['lead_generation'] = {
      step: 'sites'
    }
    

    return ctx.scene.enter('lead_generation');
  }

  @Hears('Баланс')
  @Action('balance')
  async onBalance(@Ctx() ctx: Context) {
    await this.telegramBotService.sendBalance(ctx);
  }

  @Action('top_up_balance')
  async onTopUpBalance(@Ctx() ctx: Context) {
    await this.telegramBotService.topUpBalance(ctx);
  }

  @Hears('Партнерская программа')
  @Action('partner_program')
  async onPartnerProgram(@Ctx() ctx: Context) {
    await this.telegramBotService.sendPartnerProgram(ctx);
  } 



  @Hears('Партнерская программа')
  @Action('referral_program')
  async onReferralProgram(@Ctx() ctx: Context) {
    await this.telegramBotService.sendReferralProgram(ctx);
  }

  @Hears('Прислать клиенту exel')
  @Action('anonymization')
  async onAnonymization(@Ctx() ctx: Context & SceneContext) {
    await this.telegramBotService.sendUserExelAnonymization(ctx);
  }

  @Action('bad_report')
  async onBadReport(@Ctx() ctx: Context) {
    await this.telegramBotService.sendQualitySurvey(ctx);
  }

  @Hears('начать рассылку')
  async startMailing(@Ctx() ctx: Context) {
    await this.telegramBotService.startMailing(ctx);
  }

  @Hears("ДЕАНОНИМИЗАЦИЯ")
  @Hears("deanon")
  async deanon(@Ctx() ctx: Context) {
    await this.telegramBotService.startMailing(ctx);
  }

  @Hears("/create_userbot")
  async onCreateUserbot(@Ctx() ctx: SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);
    
    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    await ctx.scene.enter('create_userbot');
  }

  @Hears("/send_anonymized_leads")
  async onSendAnonymizedLeads(@Ctx() ctx: Context) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    await this.adminService.getAnonymizedUsers(ctx);
  }

  @Action(/^admin_accept_inviting:\d+$/) // Регулярное выражение для паттерна
  async onAdminAcceptInviting(@Ctx() ctx: Context) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    try {
      // Проверка наличия данных
      if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) {
        throw new Error('No callback data');
      }

      // Безопасное извлечение параметров
      const match = ctx.callbackQuery.data.match(/^admin_accept_inviting:(\d+)$/);
      if (!match) {
        throw new Error('Invalid callback data format');
      }

      const [_, userId] = match;

      await this.adminService.acceptInviting(userId);
    
    } catch (error) {
      console.error('Error in admin_accept_inviting:', error);
      await ctx.answerCbQuery('Произошла ошибка').catch(console.error);
    }
  }

  @Hears('tools_inviting')
  @Action('tools_inviting')
  @Hears('/start_inviting')
  async onStartInviting(@Ctx() ctx: Context & SceneContext) {
    console.log('start_inviting');
    ctx.session['start_inviting'] = {
      step: 'instructions'
    }

    return ctx.scene.enter('start_inviting');
  }

  @Hears('tools_telegram')
  @Action('tools_telegram')
  @Hears('/start_mailing')
  async onStartMailing(@Ctx() ctx: Context & SceneContext) {
    ctx.session['start_mailing'] = {
      step: 'instructions'
    }

    return ctx.scene.enter('start_mailing');
  }

  @Action(/^admin_inviting_order:\d+$/)
  async onAdminInvitingOrder(@Ctx() ctx: Context) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    try {
      if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) {
        throw new Error('No callback data');
      }

      const match = ctx.callbackQuery.data.match(/^admin_inviting_order:(\d+)$/);
      if (!match) {
        await ctx.reply('No callback data');
        return;
      }

      const [userId] = match;
      await ctx.answerCbQuery('Заявка принята в обработку');

    } catch (error) {
      console.error('Error in admin_inviting_order:', error);
      await ctx.answerCbQuery('Произошла ошибка').catch(console.error);
    }
  }

  @Action(/^admin_accept_mailing:\d+$/)
async onAdminMailingOrder(@Ctx() ctx: Context) {
  try {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
      return;
    }

    if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) {
      await ctx.reply('No callback data');
      return;
    }

    const callbackData = ctx.callbackQuery?.data;
    if (!callbackData) {
      throw new Error('No callback data');
    }

    const match = callbackData.match(/^admin_accept_mailing:(\d+)$/);
    if (!match) {
      throw new Error(`Invalid callback data format: ${callbackData}`);
    }

    const userId = parseInt(match[1], 10);

    //await this.adminService.acceptMailing(userId.toString(), ctx);
  } catch (error) {
    console.error('Error in admin_accept_mailing:', error);
    await ctx.answerCbQuery('Произошла ошибка при обработке заявки', { show_alert: true }).catch(console.error);
  }
}

  @Hears('tools_sms')
  @Action('tools_sms')
  @Hears('/send_sms_mailing')
  async onSendSmsMailing(@Ctx() ctx: Context & SceneContext) {
    await this.telegramBotService.sendSmsMailing(ctx);
  }

  @Hears('setting_cabinet')
  @Action('setting_cabinet')
  async onSettingCabinet(@Ctx() ctx: Context & SceneContext) {
    ctx.session['setting_cabinet'] = {
      step: 'company_name'
    }

    await ctx.scene.enter('setting_cabinet');
  }

  @Hears('setting_cabinet')
  @Action('setting_cabinet')
  async onCompetitors(@Ctx() ctx: Context & SceneContext) {
    const competitors = await this.userService.getCompetitors(ctx.from.id);
    
  }

  @Hears('settings')
  @Hears('Инструкция')
  @Action('instruction')
  async onSettingsCabinet(@Ctx() ctx: Context & SceneContext) {
    await this.telegramBotService.sendInstruction(ctx);
  }

  @Hears('Задать вопрос')
  @Action('question')
  async onQuestion(@Ctx() ctx: Context) {
    await ctx.reply('Напишите Ваш вопрос в поддержку', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Поддержка', url: 'https://t.me/Peremoney_Support' }]
        ]
      }
    });
  }

  @Hears('Реферальная программа')
  @Action('referral_program')
  async onRefLink(@Ctx() ctx: Context) {
    await this.telegramBotService.sendReferralProgram(ctx);
  }

  @Hears('Инструменты')
  @Action('tools')
  async onTools(@Ctx() ctx: Context) {
    await this.telegramBotService.sendToolsMenu(ctx);
  }

  @Action('admin_functional')
  async onAdminFunctional(@Ctx() ctx: Context) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    await this.telegramBotService.sendAdminFunctional(ctx);
  }

  @Action('admin_ban_user')
  async onAdminBanUser(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }
    

    await ctx.scene.enter('admin_ban_user');
  }

  @Action('admin_delete_ban')
  async onAdminDeleteBan(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    await ctx.scene.enter('admin_delete_ban');
  }

  @Action('admin_change_rate')
  async onAdminChangeRate(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement change rate logic
    await ctx.scene.enter('admin_change_rate');
  }

  @Action('admin_change_leads')
  async onAdminChangeLeads(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement change leads logic
    await ctx.scene.enter('admin_change_leads');
  }

  @Action('admin_set_moderator')
  async onAdminSetModerator(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin') {
      await ctx.answerCbQuery('Только администратор может назначать модераторов', { show_alert: true });
      return;
    }

    // TODO: Implement set moderator logic
    await ctx.scene.enter('admin_set_moderator');
  }

  @Action('admin_show_users')
  async onAdminShowUsers(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement show users logic
    await ctx.scene.enter('admin_show_users');
  }

  @Action('admin_show_orders')
  async onAdminShowOrders(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement show orders logic
    await ctx.scene.enter('admin_show_orders');
  }

  @Action('admin_set_company_name')
  async onAdminSetCompanyName(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement set company name logic
    await ctx.scene.enter('admin_set_company_name');
  }

  @Action('admin_change_company_name')
  async onAdminChangeCompanyName(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    // TODO: Implement change company name logic
    await ctx.scene.enter('admin_change_company_name');
  }

  @Action('top_up_balance_order')
  @Hears('top_up_balance_order')
  async topUpBalanceOrder(@Ctx() ctx: Context & SceneContext) {
    await ctx.scene.enter('buying_leads');
    ctx.session['buying_leads'] = {
      step: 'quantity'
    }
  }

  @Action(/^top_up_balance:(\d+)$/) 
  async topUpBalance(@Ctx() ctx: Context & any) {
    console.log(ctx.match)
    const amount = parseInt(ctx.match[1], 10);
    await this.telegramBotService.sendInvoice(ctx, amount);
  }

  @On('pre_checkout_query')
  async onPreCheckoutQuery(@Ctx() ctx: Context) {
    await ctx.telegram.answerPreCheckoutQuery(
      ctx.preCheckoutQuery.id,
      true
    );
  }

  @On('successful_payment')
  async onSuccessfulPayment(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
   
  }

  @Action('tools_CRM')
  async onToolsCRM(@Ctx() ctx: Context & SceneContext) {
    ctx.session['load_crm'] = {
      step: 'type'
    }

    await ctx.scene.enter('load_crm');
  }

  
  @Action('tools_robot')
  async onToolsRobot(@Ctx() ctx: Context & SceneContext) {
    ctx.session['start_calling'] = {
      step: 'instructions'
    }

    await ctx.scene.enter('start_calling');
  }

  @Action(/^admin_accept_calls:\d+$/) // Регулярное выражение для паттерна
  async onAdminAcceptCalls(@Ctx() ctx: Context & SceneContext) {
    const user = await this.userService.getUserByTelegramId(ctx.from.id);

    if (user?.role !== 'admin' && user?.role !== 'moderator') {
      return;
    }

    try {
      // Проверка наличия данных
      if (!ctx.callbackQuery || !('data' in ctx.callbackQuery)) {
        throw new Error('No callback data');
      }

      // Безопасное извлечение параметров
      const match = ctx.callbackQuery.data.match(/^admin_accept_calls:(\d+)$/);
      if (!match) {
        throw new Error('Invalid callback data format');
      }

      const [_, userId] = match;
      
      await this.adminService.acceptCallsOrder(ctx, userId);
    
    } catch (error) {
      console.error('Error in admin_accept_inviting:', error);
      await ctx.answerCbQuery('Произошла ошибка').catch(console.error);
    }
  }

  @Hears('Мои конкуренты')
  @Action('my_concurents')
  async sendCompetitors(ctx:Context) {
    await this.telegramBotService.sendCompetitors(ctx);
  }

  @Action(/^enable_auto:.+$/)
  async onEnableAuto(@Ctx() ctx: Context & any) {
    const match = ctx.callbackQuery.data.match(/^enable_auto:(.+)$/);
    if (!match) {
      throw new Error('Invalid callback data format');
    }

    const [_, projectName] = match;
    await this.telegramBotService.enableAuto(ctx, projectName);
  }

  @Action(/^disable_auto:.+$/)
  async onDisableAuto(@Ctx() ctx: Context & any) {

    const match = ctx.callbackQuery.data.match(/^disable_auto:(.+)$/);
    if (!match) {
      throw new Error('Invalid callback data format');
    }

    const [_, projectName] = match;

    console.log(projectName);
    await this.telegramBotService.disableAuto(ctx, projectName);
  }

  @Action('daily_use_tools')
  async onDailyUseTools(@Ctx() ctx: Context & SceneContext) {
    await this.telegramBotService.dailyUseTools(ctx);
  }

  @Action("my_leads")
  async sendUserLeads(@Ctx() ctx: Context) {
    await this.telegramBotService.sendLeads(ctx);
  }

  @Action("my_companys")
  async sendUserCompanyes(@Ctx() ctx: Context) {
    await this.telegramBotService.sendCompanyes(ctx);
  }

}

//:${user.id}