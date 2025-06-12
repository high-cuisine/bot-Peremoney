import { Module } from "@nestjs/common";
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from "./redis.service";

@Module({
    providers:[RedisService],
    imports:[
        RedisModule.forRoot({
            type: 'single',
            url: 'redis://localhost:6379',
          })
    ],
    exports:[RedisService]
})
export class RedisModuleCustom {}