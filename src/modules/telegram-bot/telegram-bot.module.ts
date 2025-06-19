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
import { BannedGuard } from '../../common/guards/banned.guard';
import { RedisModuleCustom } from '../../core/redis/redis.module';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { BannedMiddleware } from './middleware/banned.middleware';
import { AdminBanUserScene } from './scenes/admin/users-management/admin-ban-user.scene';
import { AdminUnbanUserScene } from './scenes/admin/users-management/admin-unban-user.scene';
import { ChangeRateScene } from './scenes/admin/users-management/change-rate.scene';
import { ChangeLeadsScene } from './scenes/admin/orders-management/change-leads.scene';
import { SetModeratorScene } from './scenes/admin/users-management/set-moderator.scene';
import { ShowUsersScene } from './scenes/admin/users-management/show-users.scene';
import { ShowOrdersScene } from './scenes/admin/orders-management/show-orders.scene';
import { SetCompanyNameScene } from './scenes/admin/orders-management/set-company-name.scene';
import { PaymentModule } from '../payment/payment.module';
import { BuyingLeadsScene } from './scenes/clients/buyingLeads.scene';
import { LoadCRMScene } from './scenes/clients/register-crm.scene';
import { StartCallingScene } from './scenes/auto/start-calling.scene';
import { CallsModule } from '../calls/calls.module';
import { LeadsModule } from '../leads/leads.module';

const session = new LocalSession()

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UsersModule), 
    ExelModule,
    UserBotsModule,
    RedisModuleCustom,
    PaymentModule,
    PrismaModule,
    forwardRef(() => AdminModule),
    forwardRef(() => MailingModule),
    forwardRef(() => LeadsModule  ),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TELEGRAM_BOT_TOKEN'),
        include: [],
        middlewares: [session.middleware()],
      }),
    }),
    CallsModule,
  ],
  providers: [
    BotUpdate,
    TelegramBotService,
    RegisterScene,
    LeadGenerationScene,
    LoadUserExelDeanonymization,
    CreateUserbotScene,
    StartInvitingScene,
    StartMailingScene,
    SmsMailingScene,
    SettingCabinetScene,
    BannedGuard,
    BannedMiddleware,

    AdminBanUserScene,
    AdminUnbanUserScene,  
    ChangeRateScene, 
    ChangeLeadsScene,
    SetModeratorScene,
    ShowUsersScene,
    ShowOrdersScene,
    SetCompanyNameScene,
    BuyingLeadsScene,
    LoadCRMScene,
    StartCallingScene,
  ],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
