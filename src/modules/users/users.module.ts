import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BannedService } from './banned.service';
import { RedisModuleCustom } from 'src/core/redis/redis.module';
import { OrdersService } from './orders.service';

@Module({
    imports:[PrismaModule, RedisModuleCustom],
    providers: [UsersService, BannedService, OrdersService],
    controllers: [UsersController],
    exports:[UsersService, BannedService, OrdersService]
})
export class UsersModule {}
 