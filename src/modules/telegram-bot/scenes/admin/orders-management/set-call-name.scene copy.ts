import { Ctx, Scene, SceneEnter, On, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { OrdersService } from 'src/modules/users/orders.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';
import { CallsService } from '../../../../calls/calls.service';

interface CallInfoInt {
    telegramId:number,
    text:string,
    username:string,
    leads:any[]
}

interface AdminSetCallInt {
    callInfo: CallInfoInt
}

@Scene('admin_set_call_name')
export class SetCallsCompanyNameScene {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly callsService: CallsService
    ) {}

    @SceneEnter()
    async onSceneEnter(@Ctx() ctx: SceneContext) {
        await ctx.reply(
            'Введите номер компании для обзвона (только цифры):',
            Markup.forceReply()
        );
        await ctx.session['admin_set_call_name']
        await addCancelButton(ctx);
    }
    

    @On('text')
    async onMessage(@Ctx() ctx: SceneContext) {
        const message = ctx.message['text'];
        
        if (await handleCancelButton(ctx, message)) {
            return;
        }

        // Проверяем, что введены только цифры
        if (!/^\d+$/.test(message)) {
            await ctx.reply('❌ Пожалуйста, введите только цифры');
            return;
        }

        try {
            const session = await ctx.session['admin_set_call_name'] as AdminSetCallInt;
            console.log(session.callInfo)
            await this.ordersService.createCallsOrder(message, session.callInfo.telegramId);
            const result = await this.callsService.createCall(session.callInfo.text, session.callInfo.leads);
       
            if (result) {
                await ctx.reply(`✅ Номер компании для обзвона успешно установлен: ${message}\n Обзвон инициирован `);
            } else {
                await ctx.reply(`❌ Не удалось установить номер компании для обзвона`);
            }
        } catch (error) {
            await ctx.reply('❌ Произошла ошибка при установке номера компании для обзвона');
            console.error(error)
        }

        await ctx.scene.leave();
    }
} 