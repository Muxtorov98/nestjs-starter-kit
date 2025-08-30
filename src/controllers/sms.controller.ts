import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { SmsDto } from '../dtos/sms.dto';

@Controller('sms')
export class SmsController {
  constructor(@InjectQueue('sms') private readonly smsQueue: Queue) {}

  @Post()
  async send(@Body() dto: SmsDto) {
    await this.smsQueue.add('send', dto);
    return { success: true, queued: true };
  }
}
