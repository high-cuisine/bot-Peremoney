import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../core/prisma/Prisma.service';
import { Prisma } from '@prisma/client';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class PaymentService {
    
    constructor(private readonly prisma: PrismaService, 
            private readonly adminService: AdminService) {}

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

        return sale;
    }

    async createPayment(userId: number, amount: number) {
        // Check if user exists
        const user = await this.prisma.user.findUnique({
            where: { telegramId: userId }
        });

        if (!user) {
            console.error('User not found');
            return;
        }

        const payment = await this.prisma.payments.create({
            data: {
                userId: user.id, // Use the internal user ID instead of telegramId
                amount,
                status: 'pending',
                Hash: '' // We'll update this with the actual payment hash when we get it from NowPayments
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

        const leadsUser = payment.amount > 200000 ? payment.amount * 1.1 : payment.amount > 50000 ? payment.amount * 1.05 : payment.amount;

        await this.prisma.user.update({
            where: {
                id: payment.userId
            },
            data: {
                leads: { increment: leadsUser }
            }
        });

        const user = await this.prisma.user.findUnique({
            where: {
                id: payment.userId
            }
        });

        const adminMessage = `
        <b>Пополнение баланса</b>
        <b>Пользователь:</b> ${user.username}
        <b>Сумма:</b> ${payment.amount}
        <b>Статус:</b> ${payment.status}
        `
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
