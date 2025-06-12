import { Module, forwardRef } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  imports: [forwardRef(() => TelegramBotModule)],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {} 