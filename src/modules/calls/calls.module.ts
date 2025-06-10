import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';

@Module({
  providers: [CallsService]
})
export class CallsModule {}
