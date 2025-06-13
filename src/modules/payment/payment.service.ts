import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../core/prisma/Prisma.service';
import { Prisma, PaymentType } from '@prisma/client';
import { AdminService } from '../admin/admin.service';
import bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
    
    constructor(private readonly prisma: PrismaService, 
            private readonly adminService: AdminService,
            private readonly userService: UsersService
        ) {}

    async findSale(telegramId: number) {
        const user = await this.prisma.user.findUnique({
            where: { telegramId: telegramId }
        });

        if (!user) {
            console.error('User not found');
            return;
        }

        const sale = await this.prisma.userSales.findFirst({
            where: {
                userId: user.id
            }
        });

        if(!sale) return 70

        return sale.amount;
    }

    async createPayment(userId: number, amount: number, type: 'replenishment' | 'pro' | 'premium') {
        // Check if user exists
        const user = await this.prisma.user.findUnique({
            where: { telegramId: userId }
        });

        if (!user) {
            console.error('User not found');
            return;
        }

        const hash = await bcrypt.hash(`${userId}-${amount}-${type}`, 10);

        // First find the payment if it exists
        const existingPayment = await this.prisma.payments.findFirst({
            where: {
                userId: user.id,
                status: 'pending'
            }
        });

        if (existingPayment) {
            await this.prisma.payments.update({
                where: {
                    id: existingPayment.id
                },
                data: {
                    status: 'error'
                }
            });
        }

        const payment = await this.prisma.payments.create({
            data: {
                userId: user.id,
                amount,
                status: 'pending',
                Hash: hash,
                type
            }
        });

        return payment;
    }

    async successPayment(userId: number) {
        // First find the payment
        const payment = await this.prisma.payments.findFirst({
            where: {
                userId,
                status: 'pending'
            }
        });

        if (!payment) {
            throw new Error('No pending payment found for this user');
        }

        // Then update it using its id
        const payments = await this.prisma.payments.update({
            where: {
                id: payment.id
            },
            data: {
                status: 'success'
            }
        });

        const user = await this.prisma.user.findUnique({
            where: {
                id: payment.userId
            }
        });

        let adminMessage = '';
        let businessLogic = null;

        switch (payment.type) {
            case 'replenishment':
                const leadsUser = payment.amount > 200000 ? payment.amount * 1.1 : payment.amount > 50000 ? payment.amount * 1.05 : payment.amount;
                
                await this.prisma.user.update({
                    where: {
                        id: payment.userId
                    },
                    data: {
                        leads: { increment: leadsUser }
                    }
                });

                adminMessage = `
                <b>Пополнение баланса</b>
                <b>Пользователь:</b> ${user.username}
                <b>Сумма:</b> ${payment.amount}
                <b>Статус:</b> ${payment.status}
                `;
                await this.userService.updateUser(user.username, {leads: Math.floor(payment.amount / 70)})
                break;

            case 'pro':
                // TODO: Implement pro subscription logic
                adminMessage = `
                <b>Активация PRO подписки</b>
                <b>Пользователь:</b> ${user.username}
                <b>Сумма:</b> ${payment.amount}
                <b>Статус:</b> ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'pro')
                break;

            case 'premium':
                // TODO: Implement premium subscription logic
                adminMessage = `
                <b>Активация PREMIUM подписки</b>
                <b>Пользователь:</b> ${user.username}
                <b>Сумма:</b> ${payment.amount}
                <b>Статус:</b> ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'pro')
                break;

            default:
                throw new Error('Unknown payment type');
        }

        await this.adminService.notifyManager(adminMessage);
        return payments;
    }
    

    async errorPayment(userId: number) {
        const payment = await this.prisma.payments.findFirst({
            where: {
                userId,
                status: 'pending'
            }
        });
    }
        
}
