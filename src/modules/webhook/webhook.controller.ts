import { Body, Controller, Post, Logger } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  @Post('')
  async webhook(@Body() body: any) {
    // Для postback из Zvonok нужно использовать req.query, но вдруг они шлют body (перестраховка)
    const ctPhone = body?.ct_phone;
    const ctStatus = body?.ct_status;
    const ctDuration = body?.ct_duration;
    const ctCallId = body?.ct_call_id;

    if (!ctPhone) {
      this.logger.warn('Получен postback без номера телефона:', body);
      return;
    }

    this.logger.log(`📞 Новый postback от номера: ${ctPhone}`);
    this.logger.log(`ℹ️  Статус: ${ctStatus}, Длительность: ${ctDuration}, ID звонка: ${ctCallId}`);

    // Дополнительно: можно здесь вызывать сервис для сохранения в БД или триггера

    return { success: true };
  }
}
