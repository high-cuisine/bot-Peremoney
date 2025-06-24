import { Injectable } from '@nestjs/common';
import { LeadGeneration } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { LeadGenerationWithUser } from './entites/LeadGeneration';
import { ExelService } from '../Exel-Module/exelModule.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class AutoSettingsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly exelService: ExelService,
        private readonly botService: TelegramBotService
    ) {}

    async startUsersAutomations() {
        const leadsGeneration = await this.prisma.leadGeneration.findMany({
            select: {
                id: true,
                userId: true,
                companyNameForCalling: true,
                projectName: true,
                competitorId: true,
                maxCount: true,
                dailyCount: true,
                auto: true,
                calling: true,
                telegramInviting: true,
                telegramMailing: true,
                user: {
                    select: {
                        telegramId: true,
                        username: true,
                    }
                }
            }
        });

        for(const lead of leadsGeneration) {
            console.log(lead, 11);
            await this.sendExelToUser(lead as LeadGenerationWithUser);
            // if(lead.auto) {
            //     await this.sendLeadsToUsers(lead as LeadGenerationWithUser);
            // }
            // else {
            //     await this.sendExelToUser(lead as LeadGenerationWithUser);
            // }
        }
    }

    async sendLeadsToUsers(leadGeneration: LeadGenerationWithUser) {
        const leads = await this.prisma.usersClients.findMany({where: {companyId: leadGeneration.id}});

        console.log(leadGeneration, 'new leads fro');
        
        if (leads.length === 0) {
            return;
        }

        const message = leads.map(lead => 
            `📱 Телефон: ${lead.phone}\n` +
            `👤 Username: ${lead.username}\n` +
            `🆔 Telegram ID: ${lead.telegramId}`
        ).join('\n\n');

        await this.botService.sendMessage(
            Number(leadGeneration.user.telegramId),
            `Новые лиды для компании ${leadGeneration.projectName}:\n\n${message}`
        );
    }

    async sendExelToUser(leadGeneration: LeadGenerationWithUser) {
        const leads = await this.prisma.usersClients.findMany({
            where: {
                companyId: leadGeneration.id,
                processed: false
            },
            select: {
                phone: true,
                username: true,
                telegramId: true,
            }
        });

        console.log(leads, 'leads');

        if (leads.length === 0) {
            return;
        }

        const exelBuffer = await this.exelService.exportToExcelBuffer(leads);

        await this.botService.sendDocumentBuffer(
            Number(leadGeneration.user.telegramId), 
            Buffer.from(exelBuffer),
            { filename: 'orders.xlsx' }
        );

        await this.prisma.usersClients.updateMany({
            where: {companyId: leadGeneration.id, processed: false},
            data: {processed: true}
        });
    }

    async disableAuto(userId:number, projectName:string) {
        await this.prisma.leadGeneration.updateMany({
            where: {userId: userId, projectName: projectName},
            data: {auto: false}
        });
    }
    
    async enableAuto(userId:number, projectName:string) {
        await this.prisma.leadGeneration.updateMany({
            where: {userId: userId, projectName: projectName},
            data: {auto: true}
        });
    }
}

//`${leadGeneration.auto ? 'Отключить автоматизацию' : 'Включить автоматизацию'}`,
