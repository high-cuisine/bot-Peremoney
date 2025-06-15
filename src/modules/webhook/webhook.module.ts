import { forwardRef, Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { UsersModule } from '../users/users.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => LeadsModule)],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
