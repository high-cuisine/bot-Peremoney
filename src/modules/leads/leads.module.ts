import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { UserBotsModule } from 'src/user-bots/user-bots.module';

@Module({
  imports: [
    UserBotsModule,
  ],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
