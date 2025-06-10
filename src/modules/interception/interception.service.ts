import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class InterceptionService {

    constructor(private readonly usersService: UsersService) {}

    async startInterception() {
        const {users, leadsGeneration} = await this.usersService.getUsersByLeads();
        const usersWithLeads = users.map(el => {
            const leadGeneration = leadsGeneration.find(lead => lead.userId === el.id);
            const leads = el.leads - (leadGeneration?.dailyCount || 0);
            return {
                telegramId: el.telegramId,
                leads: Math.min(leads, leadGeneration?.maxCount || 0),
                rate: el.rate
            }
        });
        for(const user of usersWithLeads) {
            if(user.leads > 0) {
               // await this.interceptionRepository.findOne({ where: { id: interceptionDto.id } });
            }
        }
        return users;
    }

    async 
}

// user : telegramId, leads: number, rate: 'default' | 'pro'