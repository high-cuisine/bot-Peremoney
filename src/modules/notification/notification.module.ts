import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { NotifyService } from './notification.service';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';
import { AutoSettingsModule } from '../auto-settings/auto-settings.module';

@Module({
  imports: [
    UsersModule,
    TelegramBotModule,
    AutoSettingsModule
  ],
  providers: [NotifyService],
  
})
export class NotifyModule {}