import { Injectable } from '@nestjs/common';
import { Context, Markup, Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
import axios from 'axios';
import { ExelService } from '../Exel-Module/exelModule.service';
import { Update, Message, InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { InjectBot } from 'nestjs-telegraf';
import { join } from 'path';
import { BotMessages } from './messages/messages';
import { CHANNEL_ID, CHANNEL_LINK } from './constants/links';
import { createReadStream } from 'fs';
import { SceneContext } from 'telegraf/typings/scenes';
import { MailingService } from '../mailing/mailing.service';
import { AdminService } from '../admin/admin.service';
import { PaymentService } from '../payment/payment.service';
  
@Injectable()
export class TelegramBotService {

    constructor(
        private readonly userService: UsersService,
        private readonly exelService: ExelService,
        private readonly mailingService: MailingService,
        private readonly adminService: AdminService,
        private readonly paymentService: PaymentService,
        @InjectBot() private readonly bot: Telegraf<Context>,
    ) {}

    // await ctx.replyWithPhoto(
    //     { source: photoStream },
    //     {
    //         caption: 'Для сотрудничества с нашим сервисом, напишите в поддержку, нажав на кнопку ниже',
    //     reply_markup: {
    //         inline_keyboard: [
    //             [{ text: 'Написать в поддержку', url: 'https://t.me/Peremoney_Support' }]
    //         ]
    //     }}
    // );

    async sendBanner(ctx:Context) {
        const user = await this.userService.getUserByTelegramId(ctx.from.id);
        const isRegistered = Boolean(user);
        const isAdmin = user?.role === 'admin' || user?.role === 'moderator';
        const photoPath = join(__dirname, '..', '..', 'assets/banner.png');
        const photoStream = createReadStream(photoPath);

        if(isRegistered) await this.sendMenuInline(ctx);
       
        await ctx.replyWithPhoto(
            { source: photoStream },
            {
                caption: BotMessages.start.welcome,
                reply_markup: {
                    inline_keyboard: await this.getStartBannerButtons(isRegistered, isAdmin)
                }
            }
        );

        
    }

    async sendMenuInline(ctx:Context) {
        await ctx.reply('Меню:', {
            reply_markup: {
                keyboard: await this.getMenuButtons(),
                resize_keyboard: true 
            }
        });
    }

    async getStartBannerButtons(isRegistered:boolean, isAdmin:boolean) {
        if(!isRegistered) {
            return [[{ text: 'Регистрация', callback_data: 'register' }]]
        }
        else {
            return [... await this.getMenuButtons(), ...(await this.adminService.getAdminButton(isAdmin))]
        }
    }

    async registration(ctx:Context) {

    }

    async uploadFile(ctx: Context) {
        const message = ctx.message as any;

        if (!message) {
            await ctx.reply('Пожалуйста, отправьте Excel файл.');
            return;
        }
      
        const document = message.document;
        const fileId = document.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);
      
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data);
      
        const clients = await this.exelService.readExcel(fileBuffer, ctx.from.id);

        await this.userService.saveClients(clients, ctx.from.id);
      
        await ctx.reply('Excel файл успешно обработан!');
      }

      async sendMessage(id:number, message:string) {
        console.log(id, message);
        await this.bot.telegram.sendMessage(id, message);
      }

      async getDocument(ctx:Context) {
        const clients = await this.userService.getClietns(ctx.from.id);
        const document = await this.exelService.exportToExcelBuffer(clients) as any;

        await ctx.replyWithDocument(
        { source: document, filename: 'users.xlsx' },
        { caption: 'Вот ваш Excel файл 📊' } 
        );
    }

    async sendMessageFreeBanner(ctx:Context) {

        
        await ctx.reply(
            BotMessages.subscription.banner,
            { 
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Перейти на канал', url: CHANNEL_LINK }],
                        [{ text: 'Я подписался', callback_data: 'confirm_subscription' }]
                    ]
                }
            }
        );
    }

    async checkSubscription(ctx:Context) {
        const member = await this.bot.telegram.getChatMember(CHANNEL_ID, ctx.from.id);
        const status = ['member', 'administrator', 'creator', 'left'].includes(member.status);
        const user = await this.userService.getUserByTelegramId(ctx.from.id);

        if(user.isTakingFreeLeads) {
            await ctx.reply('Вы уже получили бесплатные лиды');
            return;
        }


        if(status) {
            const file = createReadStream(join(__dirname, '..', '..', 'assets/instruction.pdf'));
            await this.userService.setFreeLeads(ctx.from.id);
            await ctx.reply(BotMessages.subscription.success,
                Markup.inlineKeyboard([
                    [{ text: 'Обратно в меню', callback_data: 'start' }]
                ])
            );
            await this.bot.telegram.sendDocument(ctx.from.id, { source: file  });
        } else {
            await ctx.reply(BotMessages.subscription.error);
        }

    }

    async sendToolsMenu(ctx:Context) {
        const user = await this.userService.getUserByTelegramId(ctx.from.id);

        if(user.rate === 'default') {
            await ctx.reply('Для использования инструментов вам необходимо иметь тариф Pro');
            return;
        }

        console.log(user);
        if(user.leads === 0) {
            await ctx.reply('Для использования инструментов вам необходимо пополнить баланс');
            return;
        }

        await ctx.reply('Инструменты:', {
            reply_markup: {
                inline_keyboard: await this.getToolsMenuButtons()
            }
        });
    }

    async sendSettingsMenu(ctx:Context) {
        await ctx.reply('Настройки:', {
            reply_markup: {
                inline_keyboard: await this.getSettingsMenuButtons()
            }
        });
    }

    async getMenuButtons(): Promise<InlineKeyboardButton[][]> {
        return [
            [{ text: 'Баланс', callback_data: 'balance' }], 
            [{ text: 'Подписка', callback_data: 'tarifs' }],
            [{ text: 'Задать вопрос', url: 'https://t.me/Peremoney_Support' }],
            [{ text: 'Перехват лидов', callback_data: 'lead_generation' }],
            [{ text: 'Инструменты', callback_data: 'tools' }],
            [{ text: 'Инструкция', callback_data: 'settings' }],
            [{ text: 'Обновить бота', callback_data: 'start' }],
            [{ text: 'Партнерская программа', callback_data: 'partner_program' }],
            [{ text: 'Реферальная программа', callback_data: 'referral_program' }]
        ];
    }

    async getSettingsMenuButtons() {
        return [
            [{ text: 'Источники', callback_data: 'setting_cabinet' }],
            [{ text: 'Инструкция', callback_data: 'settings_instruction' }],
            [{ text: 'Хочу большего', callback_data: 'tarifs' }]
        ]
    }

    async getToolsMenuButtons() {
        return [
            [{ text: 'Инструкция по работе', callback_data: 'tools_instruction' }],
            [{ text: 'Рассылки в Telegram', callback_data: 'tools_telegram' }],
            [{ text: 'Обзвон роботом', callback_data: 'tools_robot' }],
            [{ text: 'Инвайтинг в Телеграм', callback_data: 'tools_inviting' }],
            [{ text: 'Настроить выгрузку в CRM', callback_data: 'tools_CRM'}],
            [{ text: 'Настройка точечной рекламы', url: 'https://t.me/Peremoney_Support' }],
        ]
    }


    async getLeadsMenuButtons() {
        return [
            [{ text: 'Мои лиды', callback_data: 'my_leads' }],
            [{ text: 'Мои заказы', callback_data: 'my_orders' }],
            [{ text: 'Мои средства', callback_data: 'my_balance' }],
            [{ text: 'Мои конкуренты', callback_data: 'settings' }],
            [{ text: 'Начать перехват лидов', callback_data: 'start_lead_generation' }]
        ]
    }

    async sendRates(ctx:Context) {
        await ctx.reply(BotMessages.tariff.description, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Пополнить баланс', callback_data: 'top_up_balance_order' }],
                    [{ text: 'Купить подписку Pro', callback_data: 'tariff_pro' }],
                    [{ text: 'Купить подписку Premium', callback_data: 'tariff_premium' }],
                ]
            }
        });
    }


    async sendTariffMini(ctx:Context) {
        await ctx.reply('симуляция платежа и обновление тарифа');

        await this.userService.updateUserRate(ctx.from.id, 'pro');
    }

    async sendTariffPro(ctx:Context) {
        const amount = 2990
        await this.paymentService.createPayment(ctx.from.id, amount, 'pro');

        const sale = await this.paymentService.findSale(ctx.from.id);

        const price = sale ? amount * sale.amount : amount;

        const finalPrice = Math.floor(price / 179 * 100);

        await ctx.sendInvoice({
            title: `Покупка тарифа pro за ${price} RUB`,
            description: `Покупка тарифа pro в боте за ${price} рублей`,
            payload: "${payment._id}",
            currency: 'XTR',
            prices: [{ label: 'XTR', amount: finalPrice }],
            provider_token: '',
        });

        //await this.userService.updateUserRate(ctx.from.id, 'pro');
    }

    async sendLeadsMenu(ctx:Context) {
        const user = await this.userService.getUserByTelegramId(ctx.from.id);

        if(user.rate === 'default' && user.leads === 0) {
            await ctx.reply(BotMessages.upload.default);
            return;
        }

        await ctx.reply(BotMessages.upload.menu, {
            reply_markup: {
                inline_keyboard: await this.getLeadsMenuButtons()
            }
        });

    }

    async sendDocument(chatId:number, fileId:string) {
        const fileLink = await this.bot.telegram.getFileLink(fileId);
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data);

        await this.bot.telegram.sendDocument(chatId, { source: fileBuffer });
    }

    async sendDocumentBuffer(chatId: number, buffer: Buffer, options?: { filename?: string; contentType?: string }) {
        await this.bot.telegram.sendDocument(chatId, { 
            source: buffer,
            filename: options?.filename || 'document.xlsx'
        });
    }

    async sendBalance(ctx:Context) {
        const user = await this.userService.getUserByTelegramId(ctx.from.id) as any;


        await ctx.reply(BotMessages.balance.getBalance(Number(user.leads)), {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Пополнить баланс', callback_data: 'top_up_balance_order' }]
                ]
            }
        });
    }

    async topUpBalance(ctx:Context) {
        await ctx.reply('симуляция платежа и обновление баланса');

    }

    async sendPartnerProgram(ctx:Context) {
        //@Peremoney_Support
        const photoPath = join(__dirname, '..', '..', 'assets/inst_partner.png');

        const photoStream = createReadStream(photoPath);

        await ctx.replyWithPhoto(
            { source: photoStream },
            {
                caption: 'Для сотрудничества с нашим сервисом, напишите в поддержку, нажав на кнопку ниже',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Написать в поддержку', url: 'https://t.me/Peremoney_Support' }]
                ]
            }}
        );

    }

    async sendReferralProgram(ctx:Context) {
        const inviteLink = `https://t.me/Peremoney_Bot?start=${ctx.from.id}`;
        //

        const photoPath = join(__dirname, '..', '..', 'assets/inst_white.png');

        const photoStream = createReadStream(photoPath);

        await ctx.replyWithPhoto(
            { source: photoStream },
            {
                caption: 'Чтобы рекомендовать сервис друзьям и получать бонусы, нажмите на кнопку ниже. Бонус в размере 2000 рублей начислиться автоматически после пополнения другом баланса на 7000 рублей и более.',
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Пригласить', url: `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}` }]
                ]
            }
        });

    }

    async sendUserExelAnonymization(ctx:Context & SceneContext) {
        const user = await this.userService.getUserByTelegramId(ctx.from.id);

        if (!user || user.role !== 'admin' && user.role !== 'moderator') {
            return;
        }

        ctx.session['sendUserExelDeAnonymization'] = {
            step: 'name'
          }
          
          // Входим в сцену регистрации
          return ctx.scene.enter('sendUserExelDeAnonymization');
    }

    async sendQualitySurvey(ctx:Context) {
        await ctx.reply(BotMessages.qualitySurvey.start,
            Markup.inlineKeyboard([
                [{ text: '1', callback_data: 'bad_report' }],
                [{ text: '2', callback_data: 'bad_report' }],
                [{ text: '3', callback_data: 'bad_report' }],
                [{ text: '4', callback_data: 'good_report' }],
                [{ text: '5', callback_data: 'good_report' }]
            ])
        );


    }

    async sendLinkForReport(ctx:Context) {
        await ctx.reply(BotMessages.qualitySurvey.badReport, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Перейти', url: 'https://docs.google.com/forms/d/e/1FAIpQLScA25oyfqy8pyC2S4hPglne0h3jsmOAqlwRFqHQmifLv_pbbQ/viewform?usp=send_form' }]
                ]
            }
        });
    }

    async startMailing(ctx:Context) {
        const text = ctx.message['text'];

        const user = await this.userService.getUserByName(ctx.from.username);
        if (!user || user.role !== 'admin' && user.role !== 'moderator') {
            return;
        }
        
        await this.mailingService.startMailing(text, ['high_cuisine'])
    }

    async createOrderInviting(ctx:Context) {
        
    }

    async sendMessageWithButtonAction(telegramId:number, message:string, buttonText:string, callbackData:string) {
        await this.bot.telegram.sendMessage(telegramId, message, {
            reply_markup: {
                inline_keyboard: [[{text: buttonText, callback_data: callbackData}]]
            }
        });
    }

    async sendSmsMailing(ctx:Context & SceneContext) {

        ctx.session['sms_mailing'] = {
            step: 'instructions'
          }

        return ctx.scene.enter('sms_mailing');
    }

    async sendCompetitors(ctx:Context) {
        const competitors = await this.userService.getCompetitors(ctx.from.id);
        
        await ctx.reply(`Ваши конкуренты:
            сайты: ${competitors.map(competitor => competitor.webSite).join(',')}
            номера: ${competitors.map(competitor => competitor.phone).join(',')}
        `);
    }

    async sendRefLink(ctx:Context) {
        const inviteLink = `https://t.me/Peremoney_Bot?start=${ctx.from.id}`;

        await ctx.reply('Ваша реферальная ссылка:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Пригласить', url: `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}` }]
                ]
            }
        });
    }

    async sendAdminFunctional(ctx:Context) {
        await ctx.reply('Админ функционал:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Бан человека', callback_data: 'admin_ban_user' }],
                    [{ text: 'Снять бан', callback_data: 'admin_delete_ban' }],
                    [{ text: 'Изменить тариф', callback_data: 'admin_change_rate' }],
                    [{ text: 'Изменить лидов', callback_data: 'admin_change_leads' }],
                    [{ text: 'Назначить модератора', callback_data: 'admin_set_moderator' }],
                    [{ text: 'Просмотр всех пользователей', callback_data: 'admin_show_users' }],
                    [{ text: 'Просмотр всех заказов', callback_data: 'admin_show_orders' }],
                    [{ text: 'Задать имя компании человеку', callback_data: 'admin_set_company_name' }],
                    
                ]
            }
        });
    }

    async handleStarPayment(ctx: Context) {
        const message = ctx.message as any;
        if (!message?.sticker?.emoji || message.sticker.emoji !== '⭐') {
            await ctx.reply('Пожалуйста, отправьте звезду (⭐) для оплаты.');
            return;
        }

        const user = await this.userService.getUserByTelegramId(ctx.from.id);
        if (!user) {
            await ctx.reply('Пользователь не найден. Пожалуйста, зарегистрируйтесь.');
            return;
        }

        // Конвертируем звезду в лиды (1 звезда = 1 лид)
        const starsToLeads = 1.2;
        await this.userService.updateUser(user.username, { leads: user.leads + starsToLeads });

        await ctx.reply(`Оплата успешно произведена! Начислено ${starsToLeads} лид(ов).`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Проверить баланс', callback_data: 'balance' }],
                    [{ text: 'Вернуться в меню', callback_data: 'start' }]
                ]
            }
        });
    }

    async sendStarPaymentInstructions(ctx: Context) {
        await ctx.reply(
            'Для оплаты отправьте звезду (⭐) в чат.\n' +
            '1 звезда = 1 лид\n\n' +
            'После отправки звезды, баланс будет автоматически пополнен.',
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Проверить баланс', callback_data: 'balance' }],
                        [{ text: 'Вернуться в меню', callback_data: 'start' }]
                    ]
                }
            }
        );
    }

    async createStarsLink(userId:number, amount:number) {
  
        const data = {
            title: 'Meercat Coin',
            description: 'Virtual Purchase',
            payload: `User_${userId}`,
            currency: 'XTR',
            prices: JSON.stringify([{amount: amount, label: `XTR`}]),
          };
          const params = new URLSearchParams(data).toString();
      
          const response = await fetch(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink?${params}`
          );
          const json = await response.json();
          const id = Date.now();

          
        return json?.result;
    }

    async succsesPayment(ctx:Context) {
         
    }

    async preCheckoutQuery (query: { id: string; }, ctx:Context) {
        console.log("Received pre-checkout query:", query);

        await ctx.telegram.answerPreCheckoutQuery(
          query.id,
          true
        );
      
    };

    async sendInvoice(ctx:Context, amount:number) {

        await this.paymentService.createPayment(ctx.from.id, amount / 70, 'replenishment');

        const sale = await this.paymentService.findSale(ctx.from.id);

        const price = sale ? amount * sale.amount : amount;

        const finalPrice = Math.floor(price / 179 * 100);

        await ctx.sendInvoice({
            title: `Пополнение баланса на ${price} RUB`,
            description: `Пополнение баланса в боте на сумму ${price} рублей`,
            payload: "${payment._id}",
            currency: 'XTR',
            prices: [{ label: 'XTR', amount: finalPrice }],
            provider_token: '',
        });
    }

    async sendSupportMessage(userId: number) {
        const message = await this.bot.telegram.sendMessage(userId, 'Нужна помощь? Свяжитесь с поддержкой:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Написать в поддержку', url: 'https://t.me/Peremoney_Support' }],
            ]
          },
        });
    
        await this.bot.telegram.pinChatMessage(userId, message.message_id);
      }
}
