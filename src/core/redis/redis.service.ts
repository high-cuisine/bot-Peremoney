import { Injectable } from "@nestjs/common";
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    private readonly redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds) {
            await this.redis.set(key, value, 'EX', ttlSeconds);
        } else {
            await this.redis.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async sadd(key: string, value: string): Promise<void> {
        await this.redis.sadd(key, value);
    }

    async srandmember(key: string): Promise<string | null> {
        return await this.redis.srandmember(key);
    }
    
}