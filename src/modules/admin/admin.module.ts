import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';
import { UsersModule } from '../users/users.module';
import { AnonymizationModule } from '../anonymization/anonymization.module';
import { UserBotsModule } from 'src/user-bots/user-bots.module';
import { ExelModule } from '../Exel-Module/exelModule.module';
import { RedisModuleCustom } from 'src/core/redis/redis.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TelegramBotModule),
    AnonymizationModule,
    UserBotsModule,
    ExelModule,
    RedisModuleCustom
  ],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
