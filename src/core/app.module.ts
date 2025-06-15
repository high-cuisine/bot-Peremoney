import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/Prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailingModule } from 'src/modules/mailing/mailing.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { RedisModuleCustom } from './redis/redis.module';
import { WebhookModule } from 'src/modules/webhook/webhook.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule, 
    TelegramBotModule, 
    MailingModule, 
    AdminModule,
    NotifyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'assets'),
      serveRoot: '/assets/',
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    RedisModuleCustom,
    WebhookModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
