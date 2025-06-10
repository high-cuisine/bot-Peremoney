import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { NotifyService } from './notification.service';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  imports: [
    UsersModule,
    TelegramBotModule
  ],
  providers: [NotifyService],
  
})
export class NotifyModule {}