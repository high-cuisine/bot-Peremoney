import { Module } from '@nestjs/common';
import { InterceptionService } from './interception.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [InterceptionService, UsersService]
})
export class InterceptionModule {}
