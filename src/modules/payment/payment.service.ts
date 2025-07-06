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
            console.error(`User not found for telegramId: ${telegramId}`);
            return 70; // Возвращаем значение по умолчанию
        }

        const sale = await this.prisma.userSales.findFirst({
            where: {
                userId: user.id
            }
        });

        if(!sale) return 70

        return sale.amount;
    }

    async createPayment(userId: number, amount: number, type: 'replenishment' | 'free' | 'kids' | 'adult' | 'epic' | 'space' | 'beyond') {
        // Check if user exists
        const user = await this.prisma.user.findUnique({
            where: { telegramId: userId }
        });

        if (!user) {
            console.error(`User not found for telegramId: ${userId}`);
            return null;
        }

        console.log(`${userId}-${amount}-${type}`)

        //const hash = await bcrypt.hash(`${userId}-${amount}-${type}`, 10);

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

        try {
            const payment = await this.prisma.payments.create({
                data: {
                    userId: user.id,
                    amount,
                    status: 'pending',
                    Hash: 'hash',
                    type: type as PaymentType
                }
            });

            console.log(`Payment created successfully: ${payment.id} for user ${userId}`);
            return payment;
        } catch (error) {
            console.error(`Error creating payment for user ${userId}:`, error);
            return null;
        }
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
        }) as any;

        const user = await this.prisma.user.findUnique({
            where: {
                id: payment.userId
            }
        });

        let adminMessage = '';
        let businessLogic = null;

        switch (payment.type as any) {
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
                Пополнение баланса
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUser(user.username, {leads: Math.floor(payment.amount / 70)})
                break;

            case 'free':
                // TODO: Implement pro subscription logic
                adminMessage = `
                Активация PRO подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'free')
                break;

            case 'kids':
                // TODO: Implement kids subscription logic
                adminMessage = `
                Активация KIDS подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'kids')
                break;
            
            case 'adult':
                // TODO: Implement adult subscription logic
                adminMessage = `
                Активация ADULT подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'adult')
                break;  

            case 'epic':
                adminMessage = `
                Активация EPIC подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'epic')
                break;
            case 'space':
                adminMessage = `
                Активация SPACE подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'space')
                break;
            case 'beyond':
                adminMessage = `
                Активация BEYOND подписки
                Пользователь: ${user.username}
                Сумма: ${payment.amount}
                Статус: ${payment.status}
                `;
                await this.userService.updateUserRate(Number(user.telegramId), 'beyond')
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
