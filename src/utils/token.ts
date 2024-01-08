import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const tokenModuleConfig = [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
];
