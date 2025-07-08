import { Body, Controller, Post, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from '../users/orders.service';
import { LeadsService } from '../leads/leads.service';
import { UsersService } from '../users/users.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(
    private readonly ordersService: OrdersService,
    private readonly leadsService: LeadsService,
    private readonly userService: UsersService, 
  ) {}

  @Post('')
  async webhook(@Body() body: any, @Req() req: Request) {
    // Для postback из Zvonok нужно использовать req.query, но вдруг они шлют body (перестраховка)
    const phone = req.query.phone;
    const company = req.query.company;
    const status = req.query.status;

    if (!phone) {
      this.logger.warn('Получен postback без номера телефона:', body);
      return;
    }

    this.logger.log(`📞 Новый postback от номера: ${phone}`);
    this.logger.log(`ℹ️  Статус: ${status}, , ID звонка: ${company}`);
    this.logger.log('body');

    await this.ordersService.notifyUserByCompany(String(company), String(status), String(phone));
    // Дополнительно: можно здесь вызывать сервис для сохранения в БД или триггера

    return { success: true };
  }

  @Post('leads')
  async setLeads(@Body() dmpDTO: DmpDTO) {
    await this.leadsService.saveLeads(dmpDTO);
    
    return { success: true };
  }

  @Post('leads-signal')
  async setLeadsSignal(@Body() body: any) {
    if (!Array.isArray(body)) {
      await this.leadsService.saveLeadsSignal(body);
      return { success: true };
    }

    for (const item of body) {
      await this.leadsService.saveLeadsSignal(item);
    }
    return { success: true };
  }
}


// {
//   phone: '79990000000',
//   timestamp: 1749961585,
//   website: 'dmp.one',
//   page: 'https://dmp.one/',
//   page_with_parameters: 'https://dmp.one/?yclid=3725717487900465674',
//   yid: 'yeUUfxApgXckWntCxYGj',
//   utm_source: 'yandex_ibr',
//   utm_medium: 'cpc',
//   utm_campaign: 'utm_кампания|22964259',
//   utm_term: 'utm_терм',
//   utm_content: 'k50id|0100000011125291681_|cid|22964259|gid|2957028098|aid|4832745869|adp|no|pos|premium1|src|search_none|dvc|desktop|main',
//   referer: 'https://yandex.ru/',
//   ip: '127.0.0.1',
//   stock_key: '1a79a4d60de6718e8e5b326e338ae533',
//   visit__id: 123123
// }