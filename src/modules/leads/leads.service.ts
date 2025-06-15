import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { UserBotsService } from 'src/user-bots/user-bots.service';

@Injectable()
export class LeadsService { 
    constructor(
        private readonly prisma: PrismaService,
        private readonly userBotsService: UserBotsService
    ) {}

    async saveLeads(dmpDTO: DmpDTO) {
        const company = await this.prisma.leadGeneration.findFirst({where: {projectName: dmpDTO.website}})
        // if(!company) {
        //     return;
        // }

        console.log(company, dmpDTO);

        // const user = await this.prisma.user.findFirst({where: {id: company.userId}});

        // if(!user) {
        //     return;
        // }

        const usersInfo = await this.userBotsService.getUsersInfoByPhones([dmpDTO.phone])

        console.log(usersInfo);

        // const lead = await this.prisma.lead.findFirst({where: {phone: dmpDTO.phone}})

        // await this.prisma.usersClients.create({
        //     data: {
        //         userId: user.id,
        //         companyId: company.id,
        //         phone: dmpDTO.phone,
        //         timestamp: dmpDTO.timestamp,
        //         website: dmpDTO.website,
        //         page: dmpDTO.page,
        //         page_with_parameters: dmpDTO.page_with_parameters,
        //     }
        // })
    }
}
