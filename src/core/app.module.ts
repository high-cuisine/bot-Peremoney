import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/Prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { TelegramBotModule } from 'src/modules/telegram-bot/telegram-bot.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UsersModule, TelegramBotModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'assets'),
      serveRoot: '/assets/',
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
