import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UsersService } from "../users/users.service";
import { User } from "generated/prisma";
import { TelegramBotService } from "../telegram-bot/telegram-bot.service";

@Injectable()
export class NotifyService {
    constructor(
        private readonly userService: UsersService,
        private readonly telegramService: TelegramBotService
    ) {

    }

    async sendUnActiveUsers() {
        const users = await this.userService.getUsers();
        users.map( async (el:User) => {
            if(Number(el.lastAction) - Number(el.firstAction) > 24 * 7 * 3600 * 1000) {
                await this.telegramService.sendMessage(el.telegramId, 'сообщение о то неактивности')
            }
        });

        
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Amsterdam' })
    handleCron() {
        return this.sendUnActiveUsers();
    }
}