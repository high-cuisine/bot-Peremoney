import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { UserBotsService } from 'src/user-bots/user-bots.service';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class MailingService {
    constructor(
        private readonly userBotsService: UserBotsService,
        private readonly prisma: PrismaService
    ) {}

    async startInviating(userId:number, groupName:string, botId:number) {
        const inviting = await this.prisma.inviting.create({
            data: {
                userId,
                groupName,
                botId,
            }
        })
    }
} 