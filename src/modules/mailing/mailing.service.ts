import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { MailingApi } from './api/mailing.api';

@Injectable()
export class MailingService {
    constructor(
    ) {}

  async startMailing(message: string, users: any[]): Promise<void> {
    console.log(message);
    console.log(users);
    await MailingApi.sendMailing(message, users);
  }
} 