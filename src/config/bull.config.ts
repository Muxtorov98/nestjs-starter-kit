import { BullModuleOptions } from '@nestjs/bull';

export const BullConfig: BullModuleOptions = {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
};
