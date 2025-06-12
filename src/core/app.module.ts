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

@Module({
  imports: [UsersModule, TelegramBotModule, MailingModule, AdminModule,
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
