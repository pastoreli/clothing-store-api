import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { tokenModuleConfig } from 'src/utils/token';

@Module({
  imports: [UserModule, ...tokenModuleConfig],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
