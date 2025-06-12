import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService
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
        if(!user) {
            return;
        }
        const res = await this.prisma.leadGeneration.updateMany({
            where: { userId: user.id }, 
            data: { 
                projectName: companyName,
                companyNameForCalling: companyNameForCalling
            }
        });
        return res;
    }
}
