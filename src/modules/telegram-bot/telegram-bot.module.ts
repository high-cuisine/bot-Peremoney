import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './telegram-bot.update';
import { UsersModule } from '../users/users.module';
import * as LocalSession from 'telegraf-session-local'
import { UnlinkScene } from './scenes/register.scene';
import { ExelModule } from '../Exel-Module/exelModule.module';

const session = new LocalSession()

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    ExelModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TELEGRAM_BOT_TOKEN'),
        include:[],
        middlewares: [session.middleware()],
      }),
      
    }),
  ],
  providers: [BotUpdate, TelegramBotService, UnlinkScene ]
})
export class TelegramBotModule {}
