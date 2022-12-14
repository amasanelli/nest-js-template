import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const jwtConfig = {
  secret: configService.get<string>('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
  },
};
