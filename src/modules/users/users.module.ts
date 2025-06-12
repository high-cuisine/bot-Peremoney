import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BannedService } from './banned.service';
import { RedisModuleCustom } from 'src/core/redis/redis.module';
import { OrdersService } from './orders.service';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
    imports:[
        PrismaModule, 
        RedisModuleCustom, 
        forwardRef(() => TelegramBotModule)
    ],
    providers: [UsersService, BannedService, OrdersService],
    controllers: [UsersController],
    exports:[UsersService, BannedService, OrdersService]
})
export class UsersModule {}
 