import { Injectable } from '@nestjs/common';
import { Context, Markup, Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
import axios from 'axios';
import { ExelService } from '../Exel-Module/exelModule.service';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { InjectBot } from 'nestjs-telegraf';
  
@Injectable()
export class TelegramBotService {

    constructor(
        private readonly userService: UsersService,
        private readonly exelService: ExelService,
        @InjectBot() private readonly bot: Telegraf<Context>,
    ) {}

    async sendBanner(ctx:Context) {

        const photoPath = __dirname + '../../assets/banner.jpg';
       
        await ctx.reply(`тестовый текст тестовый текст тестовый текст тестовый текст тестовый текст`,
            Markup.inlineKeyboard([
                [Markup.button.callback('Регистрация', 'register')]
            ])
        )

    }

    async registration(ctx:Context) {

    }

    async uploadFile(ctx: Context) {
        const message = ctx.message as any;

        console.log(message);
        if (!message) {
            await ctx.reply('Пожалуйста, отправьте Excel файл.');
            return;
        }
      
        const document = message.document;
        const fileId = document.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);
      
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
        const fileBuffer = Buffer.from(response.data);
      
        const clients = await this.exelService.readExcel(fileBuffer, ctx.from.id);

        await this.userService.saveClients(clients, ctx.from.id);
      
        await ctx.reply('Excel файл успешно обработан!');
      }

      async sendMessage(id:number, message:string) {
        await this.bot.telegram.sendMessage(id, message);
      }

      async getDocument(ctx:Context) {
        const clients = await this.userService.getClietns(ctx.from.id);
        const document = await this.exelService.exportToExcelBuffer(clients) as any;

        await ctx.replyWithDocument(
        { source: document, filename: 'users.xlsx' },
        { caption: 'Вот ваш Excel файл 📊' } 
        );
    }
    
}

 