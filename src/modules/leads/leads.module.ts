import { forwardRef, Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { UserBotsModule } from 'src/user-bots/user-bots.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => UserBotsModule),
    PrismaModule,
  ],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
