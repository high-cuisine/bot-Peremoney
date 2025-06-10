import { Module } from '@nestjs/common';
import { UserBotsService } from './user-bots.service';
import { RedisModuleCustom } from '../core/redis/redis.module';

@Module({
  imports: [RedisModuleCustom],
  providers: [UserBotsService],
  exports: [UserBotsService]
})
export class UserBotsModule {}
