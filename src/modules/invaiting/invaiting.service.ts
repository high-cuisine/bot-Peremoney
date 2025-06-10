import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';

@Injectable()
export class MailingService {
    constructor(
    ) {}

    async startInviating(clients: any[], groupId:string) {
        
    }
} 