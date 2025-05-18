import { Injectable,  } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/Prisma.service';
import { UsersClients } from 'generated/prisma';


@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService,
    )
    {}

    async login(userId:number, hash:string) {
       
    }

    async saveClients(users: UsersDTO[], userId: number) {
        const usersCurrent = await this.prisma.usersClients.findMany({
            where: { userId: userId },
            select: { phone: true, email: true } 
        });

        const existingUsers = new Set(
            usersCurrent.map(u => `${u.phone}_${u.email}`)
        );

        const dataUser = users
            .filter(u => !existingUsers.has(`${u.phone}_${u.email}`))
            .map(({ id, ...rest }) => rest); 

        if (dataUser.length > 0) {
            console.log(dataUser)
            // await this.prisma.usersClients.createMany({
            //     data: dataUser
            // });
        }
    }

    async getUsers() {
        const users = await this.prisma.user.findMany();

        return users;
    }

    async getClietns(userId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId:userId}})
        const clients = await this.prisma.usersClients.findMany({
            where: {
                userId:user.id
            }
        });

        return clients;
    }
   
}
