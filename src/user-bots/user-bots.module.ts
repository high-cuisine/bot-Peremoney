import { Module } from '@nestjs/common';
import { UserBotsService } from './user-bots.service';
import { RedisModuleCustom } from '../core/redis/redis.module';
import { PrismaModule } from '../core/prisma/prisma.module';

@Module({
  imports: [RedisModuleCustom, PrismaModule],
  providers: [UserBotsService],
  exports: [UserBotsService]
})
export class UserBotsModule {}
