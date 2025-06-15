import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UsersService } from "../users/users.service";
import { User } from "generated/prisma";
import { TelegramBotService } from "../telegram-bot/telegram-bot.service";
import { AutoSettingsService } from "../auto-settings/auto-settings.service";

@Injectable()
export class NotifyService {
    constructor(
        private readonly userService: UsersService,
        private readonly telegramService: TelegramBotService,
        private readonly autoSettingsService: AutoSettingsService
    ) {

    }

    async sendUnActiveUsers() {
        const users = await this.userService.getUsers();
        users.map( async (el:any) => {
            if(Number(el.lastAction) - Date.now() > 24 * 7 * 3600 * 1000) {
                await this.telegramService.sendMessage(el.telegramId, 'сообщение о то неактивности')
            }
        });

        
    }

    async sendQualitySurvey() {
        const users = await this.userService.getUsers();
        users.map( async (el:any) => {
            if(Number(el.lastAction) - Date.now() > 24 * 7 * 3600 * 1000) {
                await this.telegramService.sendMessage(el.telegramId, 'сообщение о то неактивности')
            }
        });
    }

  

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Moscow' })
    handleCron() {
        return this.sendUnActiveUsers();
    }

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { timeZone: 'Europe/Moscow' })
    qualitySurvey() {
        return this.sendUnActiveUsers();
    }

    @Cron(CronExpression.EVERY_DAY_AT_11AM, { timeZone: 'Europe/Moscow' })
    sendNewLids() {
        console.log('sendNewLids');
        return this.autoSettingsService.startUsersAutomations();
    }

   
}