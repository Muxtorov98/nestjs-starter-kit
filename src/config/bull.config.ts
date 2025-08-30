import { BullModuleOptions } from '@nestjs/bull';

export const BullConfig: BullModuleOptions = {
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
};
