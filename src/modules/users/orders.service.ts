import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { UsersService } from './users.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService,
        private readonly usersService: UsersService,
        private readonly telegramBotService: TelegramBotService
    ) {}

    async createLeadGeneration(userId: number, competitorId: number, maxCount: number, dailyCount: number) {
        try {
            return await this.prisma.leadGeneration.create({
                data: {
                    userId,
                    competitorId,
                    maxCount,
                    dailyCount,
                    projectName: ""
                }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllOrdersWithDetails() {
        return await this.prisma.$queryRaw`
            SELECT 
                lg.*,
                u.username,
                u.phone,
                c."webSite" as company_name,
                c."phone" as company_phone
            FROM "lead_generation" lg
            LEFT JOIN "users" u ON lg."userId" = u.id
            LEFT JOIN "competitors" c ON lg."competitorId" = c.id
        `;
    }  
    
    async setCompanyName(username: string, companyName: string, companyNameForCalling?: string | null) {
        const user = await this.prisma.user.findUnique({where: {username}});
        console.log(user);
        if(!user) {
            return;
        }
        console.log(companyNameForCalling);
        const res = await this.prisma.leadGeneration.updateMany({
            where: { userId: user.id }, 
            data: { 
                projectName: companyName,
                companyNameForCalling: companyNameForCalling
            }
        });
        return res;
    }

    async notifyUserByCompany(companyPhone:string, status:string, phone:string) {
        //if(status !== 'compl_finished') return;

        const leadGeneration = await this.prisma.leadGeneration.findFirst({
            where: {
                companyNameForCalling:companyPhone
            }
        });
        if (!leadGeneration) return;

        const user = await this.usersService.getUserById(leadGeneration.userId);
        if (!user) return;

        await this.telegramBotService.sendMessage(Number(user.telegramId), `Новый клиент после обзвона роботом: ${phone}`);
    }
}
