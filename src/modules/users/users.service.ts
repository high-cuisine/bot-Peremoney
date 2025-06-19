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
            select: { phone: true} 
        });

        const existingUsers = new Set(
            usersCurrent.map(u => `${u.phone}`)
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
   
    async getUserByTelegramId(telegramId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId:telegramId}})
        return user;
    }

    async createUser(telegramId:number, username:string, lastAction:Date, firstAction:Date) {
        const user = await this.prisma.user.create({data: {
            telegramId:telegramId,
            username:username,
            role:'user',
            rate:'default',
            lastAction:new Date(),
            firstAction:new Date(),
            
        }})
        return user;
    }

    async getUsersByRole(role:'user' | 'moderator' | 'admin') {
        const users = await this.prisma.user.findMany({where: {role:role}})
        return users;
    }

    async updateUserRate(telegramId:number, rate:'default' | 'pro') {
        const user = await this.prisma.user.update({where: {telegramId:telegramId}, data: {rate:rate}})
        return user;
    }

    async getUserByName(username:string) {
        const user = await this.prisma.user.findFirst({where: {username}})
        return user;
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async checkProSubscription(telegramId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(user.rate === 'pro') {
            return true;
        }
        return false;
    }

    async setFreeLeads(telegramId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(user.isTakingFreeLeads) {
            return;
        }
        await this.prisma.user.update({where: {telegramId}, data: {leads: {increment: 100}, isTakingFreeLeads: true}})
        return user;
    }

    async createUserInfoDates(telegramId:number, isTakingBonus:boolean, whatsABusiness:string, conversion:string, about:string, CAC:number, LTV:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        await this.prisma.usersQuestion.create({data: {
            userId: user.id,
            isTakingBonus: isTakingBonus,
            whatsABusiness: whatsABusiness,
            conversion: conversion,
            about: about,
            CAC: CAC,
            LTV: LTV
        }})
    }

    async createCompetitor(telegramId:number, webSite:string, phone:string) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        return await this.prisma.competitors.create({data: {userId: user.id, webSite: webSite, phone: phone}});
    }

    async getCompetitors(telegramId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        const competitors = await this.prisma.competitors.findMany({where: {userId: user.id}})
        return competitors;
    }

    async getUsersByLeads() {
        const users = await this.prisma.user.findMany({where: {leads: {gt: 0}}})
        const leadsGeneration = await this.prisma.leadGeneration.findMany({where: {userId: {in: users.map(user => user.id)}}})
        return {users, leadsGeneration};
    }

    async getLeadsInfoByTelegramId(telegramId:number) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        const leadsGeneration = await this.prisma.leadGeneration.findFirst({where: {userId: user.id}})

        return {user, leadsGeneration};
    }

    async updateUser(username:string, data:any) {
        await this.prisma.user.update({where: {username}, data})
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany()
        return users;
    }

    async saveUserCRM(telegramId:number, apiKey:string, crmType:'amo' | 'bitrix') {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        await this.prisma.userCRM.create({data: {userId: user.id, apiKey, crmType}})
    }

    async getSalles(telegramId:number) {
        const user = this.prisma.user.findFirst({where: {telegramId}})
    }

    async disableAuto(telegramId:number, projectName:string) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        await this.prisma.leadGeneration.updateMany({where: {projectName: projectName, userId: user.id}, data: {auto: false}})
    }  

    async enableAuto(telegramId:number, projectName:string) {
        const user = await this.prisma.user.findFirst({where: {telegramId}})
        if(!user) {
            return;
        }
        await this.prisma.leadGeneration.updateMany({where: {projectName: projectName, userId: user.id}, data: {auto: true}})
    }

    async getUserCompanyes(userId:number) {
        const companyes = await this.prisma.leadGeneration.findMany({where:{userId}});

        return companyes
    }
}


// telegramId  Int               @unique
//   username    String            @unique
//   role        UserRoles         @default(user)
//   rate        UserRate          @default(default)
//   lastAction  DateTime          @default(now())
//   firstAction DateTime          @default(now())
//   clients     UsersClients[]
//   estimation  UsersEstimation[]
//   questions   UsersQuestion[]