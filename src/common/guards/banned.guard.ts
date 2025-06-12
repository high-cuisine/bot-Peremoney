import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from '../../core/redis/redis.service';
import { PrismaService } from '../../core/prisma/Prisma.service';

@Injectable()
export class BannedGuard implements CanActivate {
    private readonly BANNED_KEY_PREFIX = 'banned_user:';
    private readonly CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

    constructor(
        private readonly redis: RedisService,
        private readonly prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const telegramId = request.user?.telegramId;

        if (!telegramId) {
            return false;
        }

        const redisKey = `${this.BANNED_KEY_PREFIX}${telegramId}`;
        
        // Try to get from Redis first
        const cachedResult = await this.redis.get(redisKey);
        if (cachedResult !== null) {
            return cachedResult === 'false'; // Allow if not banned
        }

        // If not in Redis, check database
        const user = await this.prisma.user.findFirst({
            where: { telegramId, isBanned: true }
        });

        const isBanned = !!user;

        // Cache the result in Redis
        await this.redis.set(redisKey, isBanned.toString(), this.CACHE_TTL);

        return !isBanned; // Allow if not banned
    }
} 