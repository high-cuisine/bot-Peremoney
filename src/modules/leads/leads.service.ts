import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { UserBotsService } from 'src/user-bots/user-bots.service';
import { LeadsSignal } from './dto/leads.dto';

@Injectable()
export class LeadsService { 
    constructor(
        private readonly prisma: PrismaService,
        private readonly userBotsService: UserBotsService
    ) {}

    async saveLeads(dmpDTO: DmpDTO) {
        const company = await this.prisma.leadGeneration.findFirst({where: {projectName: dmpDTO.website}})
        if(!company) {
            return;
        }

        console.log(company, dmpDTO);

        const usersInfo = await this.userBotsService.getUsersInfoByPhones([dmpDTO.phone])
        await this.prisma.usersClients.create({
            data: {
                phone: dmpDTO.phone,
                telegramId: usersInfo[0].id || 0,
                username: usersInfo[0].username || "",
                user: {
                    connect: {
                        id: Number(company.userId)
                    }
                },
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })
    }

    async getUserLeads(userId:number) {
        const leads = await this.prisma.usersClients.findMany({where: {userId}});
        return leads;
    }

    async saveLeadsSignal(signalDTO: LeadsSignal) {
        const company = await this.prisma.leadGeneration.findFirst({where: {projectName: String(signalDTO.project)}})
        if(!company) {
            return;
        }

        //const usersInfo = await this.userBotsService.getUsersInfoByPhones([signalDTO.phone])

        await this.prisma.usersClients.create({
            data: {
                phone: signalDTO.phone,
                telegramId: 0,
                username: "",
                user: {
                    connect: {
                        id: Number(company.userId)
                    }
                },
                company: {
                    connect: {
                        id: company.id
                    }
                }
            }
        })
    }

    async saveLeadsSignalArray(signalDTO: LeadsSignal[]) {
        if (!Array.isArray(signalDTO)) {
            return;
        }

        for (const item of signalDTO) {
            await this.saveLeadsSignal(item);
        }
    }
}


// [
//     { phone: '79658879405', username: 'high_cuisine', id: '1042650482' }
//   ]