import { forwardRef, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './telegram-bot.update';
import { UsersModule } from '../users/users.module';
import * as LocalSession from 'telegraf-session-local'
import { RegisterScene } from './scenes/clients/register.scene';
import { ExelModule } from '../Exel-Module/exelModule.module';
import { AdminModule } from '../admin/admin.module';
import { LeadGenerationScene } from './scenes/clients/leadGeneration.scene';
import { LoadUserExelDeanonymization } from './scenes/admin/loadUserClients.scene';
import { MailingModule } from '../mailing/mailing.module';
import { CreateUserbotScene } from './scenes/admin/create-userbot.scene';
import { UserBotsModule } from '../../user-bots/user-bots.module';
import { StartInvitingScene } from './scenes/auto/start-inviting.scene';
import { StartMailingScene } from './scenes/auto/start-mailing.scene';
import { SmsMailingScene } from './scenes/auto/sms-mailing.scene';
import { SettingCabinetScene } from './scenes/clients/setting_cabinet.scene';

const session = new LocalSession()

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    ExelModule,
    UserBotsModule,
    forwardRef(() => AdminModule),
    forwardRef(() => MailingModule),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TELEGRAM_BOT_TOKEN'),
        include: [],
        middlewares: [session.middleware()],
      }),
    }),
  ],
  providers: [
    BotUpdate,
    TelegramBotService, // ⬅️ должен быть в exports тоже
    RegisterScene,
    LeadGenerationScene,
    LoadUserExelDeanonymization,
    CreateUserbotScene,
    StartInvitingScene,
    StartMailingScene,
    SmsMailingScene,
    SettingCabinetScene
  ],
  exports: [TelegramBotService], // ⬅️ ВАЖНО!
})
export class TelegramBotModule {}
