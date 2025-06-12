import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [ConfigModule, PrismaModule, forwardRef(() => AdminModule)],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
