import { Injectable, NestMiddleware } from '@nestjs/common';
import { Context, Middleware } from 'telegraf';
import { BannedGuard } from '../../../common/guards/banned.guard';

@Injectable()
export class BannedMiddleware implements NestMiddleware {
    constructor(private readonly bannedGuard: BannedGuard) {}

    async use(ctx: Context, next: () => Promise<void>) {
        const mockRequest = {
            user: {
                telegramId: ctx.from?.id
            }
        };

        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => mockRequest
            })
        };

        const isAllowed = await this.bannedGuard.canActivate(mockContext as any);

        if (!isAllowed) {
            await ctx.reply('Вы заблокированы в системе. Пожалуйста, обратитесь к администратору.');
            return;
        }

        await next();
    }
} 