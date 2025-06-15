import { Module, forwardRef } from '@nestjs/common';
import { AutoSettingsService } from './auto-settings.service';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { ExelModule } from '../Exel-Module/exelModule.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';
@Module({
    imports: [ExelModule, forwardRef(() => TelegramBotModule)],
    providers: [AutoSettingsService, PrismaService],
    exports: [AutoSettingsService]
})
export class AutoSettingsModule {}
