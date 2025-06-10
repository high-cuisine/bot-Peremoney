import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { UsersService } from '../users/users.service';
import { User } from 'generated/prisma';
import { AnonymizationService } from '../anonymization/anonymization.service';
import { BotMessages } from '../telegram-bot/messages/messages';
import { UserBotsService } from 'src/user-bots/user-bots.service';
import { ExelService } from '../Exel-Module/exelModule.service';
import { Context } from 'telegraf';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => TelegramBotService))
        private readonly telegramBotService: TelegramBotService,
        private readonly anomyzeService: AnonymizationService,
        private readonly userBotsService: UserBotsService,
        private readonly exelService: ExelService,
        private readonly redisService: RedisService
    ) {}

    async getRandomManager() {
        const managers = await this.usersService.getUsersByRole('moderator');

        if (managers.length === 0) {
            return;
        }

        const randomManager = managers[Math.floor(Math.random() * managers.length)];

        return randomManager;
    }

    async notifyManager(message:string) {
        const randomManager = await this.getRandomManager();

        if(!randomManager) {
            return;
        }

        await this.telegramBotService.sendMessage(Number(randomManager.telegramId), message);
    }

    async sendLeadGenerationData(fileIdSites:string, fileIdNumbers:string, timePeriod:string, maxLeads:number, dayLeadsLimit:number, userName:string, userLink:string) {
        const adminMessage = `
            🆕 Новая заявка на генерацию лидов!

            Файл с сайтами: ${fileIdSites}
            Файл с номерами: ${fileIdNumbers}
            Период: ${timePeriod}
            Максимальное количество лидов: ${maxLeads}
            Суточный лимит: ${dayLeadsLimit}

            Пользователь: ${userName}
            Ссылка на пользователя: ${userLink}
        `;
        const managers = await this.usersService.getUsersByRole('moderator');

        if (managers.length === 0) {
            return;
        }

        const randomManager = managers[Math.floor(Math.random() * managers.length)];

        await this.telegramBotService.sendMessage(Number(randomManager.telegramId), adminMessage);

    }

    async sendUserExelAnonymization(username:string, dataClients:any[]) {
        const user = await this.usersService.getUserByName(username);
        
        if(user.rate !== 'pro') {
            return dataClients;
        }

        const emails = dataClients.map(el => {return { email: el.email}});

        const deanonEmails = await this.anomyzeService.getDeAnonymizeList(emails);

        return deanonEmails;
    }

    async notificationReplenishment(user: User, payment:number) {
        const moderators = await this.usersService.getUsersByRole('moderator');

        if (moderators.length === 0) {
            return;
        }

        const randomModerator = moderators[Math.floor(Math.random() * moderators.length)];
        await this.telegramBotService.sendMessage(Number(randomModerator.telegramId), BotMessages.manager.newPayment(user.username, payment));
    }

    async getAnonymizedUsers(ctx:Context) {
        const clients = [
            "+79658879405",
            "+79379697474",
            "+79370294060"
        ]
        const usersInfo = await this.userBotsService.getUsersInfoByPhones(clients);

        console.log(usersInfo);

        const document = await this.exelService.exportToExcelBuffer(usersInfo) as any;

        await ctx.replyWithDocument(
        { source: document, filename: 'users.xlsx' },
        { caption: 'Вот ваш Excel файл 📊' } 
        );
    }

    async sendAdminInvitingOrder(userName:string, groupId:any, groupLink:string, leads:any[]) {

        const user = await this.usersService.getUserByName(userName);

        const manager = await this.getRandomManager();

        if(!manager) {
            return;
        }

        const message = `
            Пользователь ${user.username}
            Создал заявку на инвайтинг
            Группа: ${groupId}
            Ссылка на группу: ${groupLink}
            Колличество лидов: ${leads.length}

            action: admin_inviting_order:${user.telegramId}}
        `

        await this.redisService.set(`admin_inviting_order:${user.id}`, JSON.stringify({
            groupId: groupId,
            groupLink: groupLink,
            leads: leads,
            user: user.id,
            status: 'pending'
        }));

        console.log(`admin_inviting_order:${user.id}`);
        await this.telegramBotService.sendMessageWithButtonAction(Number(manager.telegramId), message, 'Принять', `admin_accept_inviting:${user.id}`);
    }

    async acceptInviting(userId:string) {
        
        const data = await this.redisService.get(`admin_inviting_order:${userId}`);
        console.log(data, `admin_inviting_order:${userId}`);

        if(!data) {
            return;
        }
        
        const invitingData = JSON.parse(data);

        console.log(invitingData.leads);
        
        await this.userBotsService.inviteGroup(invitingData.leads, 'testchannel23325');
        
    }

    async sendAdminMailingOrder(usernames: string[], message: string, username:string) {
        const user = await this.usersService.getUserByName(username);

        const manager = await this.getRandomManager();

        if(!manager) {
            return;
        }

        const messageAdmin = `
            Пользователь ${user.username}
            Создал заявку на рассылку
            Сообщение: ${message}
            Колличество пользователей: ${usernames.length}

            action: admin_inviting_order:${user.telegramId}}
        `

        await this.redisService.set(`admin_inviting_order:${user.id}`, JSON.stringify({
            usernames: usernames,
            message: message,
            user: user.id,
            leads: usernames,
            status: 'pending'
        }));

        console.log(`admin_inviting_order:${user.id}`);

        await this.telegramBotService.sendMessageWithButtonAction(Number(manager.telegramId), messageAdmin, 'Принять', `admin_accept_mailing:${user.id}`);
        
    }

    async acceptMailing(username:string, ctx:Context) {
        const data = await this.redisService.get(`admin_inviting_order:${username}`);
        console.log(data, `admin_inviting_order:${username}`);

        if(!data) {
            return;
        }

        const mailingData = JSON.parse(data);

        await this.userBotsService.createMailing(mailingData.usernames, mailingData.message);

        await this.redisService.del(`admin_inviting_order:${username}`);

        await ctx.reply('Заявка на рассылку принята');

    }

    async sendAdminMessage(message:string) {
        const manager = await this.getRandomManager();

        if(!manager) {
            return;
        }

        await this.telegramBotService.sendMessage(Number(manager.telegramId), message);
    }

    async getAdminButton(isAdmin:boolean) {
        if(!isAdmin) {
            return [];
        }

        return [
            [{ text: 'Функционал админа', callback_data: 'admin_functional' }],
        ]
    }

    async changeLeads(username:string, leads:number) {
        

        await this.usersService.updateUser(username, {leads});
    }

    async changeTariff(username:string, tariff:string) {
        await this.usersService.updateUser(username, {rate: tariff as 'default' | 'pro'});
    }
}
