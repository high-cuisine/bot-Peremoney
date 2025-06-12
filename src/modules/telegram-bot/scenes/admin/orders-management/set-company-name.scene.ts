import { Ctx, Scene, SceneEnter, On, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { OrdersService } from 'src/modules/users/orders.service';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { BotMessages } from '../../../messages/messages';
import { addCancelButton, handleCancelButton } from '../../../helpers/scene.helper';

@Scene('admin_set_company_name')
export class SetCompanyNameScene {
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
        const message = ctx.message['text'];
        
        if (await handleCancelButton(ctx, message)) {
            return;
        }
        
        if (!ctx.scene.state['username']) {
            ctx.scene.state['username'] = message;
            await ctx.reply(
                'Теперь введите название компании:',
                Markup.forceReply()
            );
            return;
        }

        if (!ctx.scene.state['companyName']) {
            ctx.scene.state['companyName'] = message;
            await ctx.reply(
                'Введите название компании для обзвона (или отправьте "null" если не нужно):',
                Markup.forceReply()
            );
            return;
        }

        const username = ctx.scene.state['username'];
        const companyName = ctx.scene.state['companyName'];
        const companyNameForCalling = message.toLowerCase() === 'null' ? null : message;

        try {
            const result = await this.ordersService.setCompanyName(username, companyName, companyNameForCalling);
            
            if (result) {
                await ctx.reply(`✅ Название компании успешно установлено для пользователя @${username}`);
            } else {
                await ctx.reply(`❌ Пользователь @${username} не найден`);
            }
        } catch (error) {
            await ctx.reply('❌ Произошла ошибка при установке названия компании');
        }

        await ctx.scene.leave();
    }
} 