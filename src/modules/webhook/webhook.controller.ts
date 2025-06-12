import { Body, Controller, Post, Logger, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

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
    this.logger.log(body);

    // Дополнительно: можно здесь вызывать сервис для сохранения в БД или триггера

    return { success: true };
  }
}
