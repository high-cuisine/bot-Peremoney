import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class BannedService {
    private readonly BANNED_KEY_PREFIX = 'banned_user:';
    private readonly CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds

    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService
    ) {}

    async getBannedUsers() {
        return await this.prisma.user.findMany({where: {isBanned: true}});
    }   

    async banUser(username:string) {
        await this.prisma.user.update({where: {username}, data: {isBanned: true}});
    }

    async unbanUser(username:string) {
        await this.prisma.user.update({where: {username}, data: {isBanned: false}});
    }

    async checkBanned(telegramId: number) {
        const redisKey = `${this.BANNED_KEY_PREFIX}${telegramId}`;
        
        // // Try to get from Redis first
        // const cachedResult = await this.redis.get(redisKey);
        // if (cachedResult !== null) {
        //     return cachedResult === 'true';
        // }

        // // const user = await this.prisma.user.findFirst({
        // //     where: { telegramId, isBanned: true }
        // // });

        // // const isBanned = !!user;

        // // Cache the result in Redis
        // await this.redis.set(redisKey, isBanned.toString(), this.CACHE_TTL);

        // return isBanned;
    }
}
