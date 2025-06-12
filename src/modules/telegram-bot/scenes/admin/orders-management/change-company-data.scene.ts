import { Ctx, Scene, SceneEnter, On, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { OrdersService } from 'src/modules/users/orders.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

@Scene('admin_change_company_data')
export class ChangeCompanyDataScene {
    constructor(private readonly ordersService: OrdersService) {}

    @SceneEnter()
    async onSceneEnter(@Ctx() ctx: SceneContext) {
        await ctx.reply(
            'Введите username пользователя:',
            Markup.forceReply()
        );
        await addCancelButton(ctx);
    }

    @On('text')
    async onMessage(@Ctx() ctx: SceneContext) {
        const text = (ctx.message as any).text;
        
        if (await handleCancelButton(ctx, text)) {
            return;
        }

        if (!ctx.scene.state['username']) {
            ctx.scene.state['username'] = text;
            await ctx.reply(
                'Введите новые данные о компании в формате:\n' +
                'Название компании\n' +
                'Контактное лицо\n' +
                'Телефон',
                Markup.forceReply()
            );
            return;
        }

        const username = ctx.scene.state['username'];
        const companyData = text.split('\n');

        if (companyData.length !== 3) {
            await ctx.reply(
                'Неверный формат данных. Пожалуйста, введите данные в формате:\n' +
                'Название компании\n' +
                'Контактное лицо\n' +
                'Телефон'
            );
            return;
        }

        try {
            await this.ordersService.setCompanyName(username, companyData[0]);
            await ctx.reply('Данные компании успешно обновлены!');
        } catch (error) {
            await ctx.reply('Произошла ошибка при обновлении данных компании.');
        }

        await ctx.scene.leave();
    }

    @Action('cancel')
    async onCancel(@Ctx() ctx: SceneContext) {
        await ctx.reply('❌ Операция отменена');
        await ctx.scene.leave();
    }
} 