import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BannedService } from './banned.service';
import { RedisModuleCustom } from 'src/core/redis/redis.module';

@Module({
    imports:[PrismaModule, RedisModuleCustom],
    providers: [UsersService, BannedService],
    controllers: [UsersController],
    exports:[UsersService]
})
export class UsersModule {}
 