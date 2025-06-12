import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';
import { UsersModule } from '../users/users.module';
import { AnonymizationModule } from '../anonymization/anonymization.module';
import { UserBotsModule } from 'src/user-bots/user-bots.module';
import { ExelModule } from '../Exel-Module/exelModule.module';
import { RedisModuleCustom } from 'src/core/redis/redis.module';
import { SetCallsCompanyNameScene } from '../telegram-bot/scenes/admin/orders-management/set-call-name.scene copy';
import { CallsModule } from '../calls/calls.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TelegramBotModule),
    AnonymizationModule,
    UserBotsModule,
    ExelModule,
    RedisModuleCustom,
    CallsModule
  ],
  providers: [AdminService, SetCallsCompanyNameScene],
  exports: [AdminService]
})
export class AdminModule {}
