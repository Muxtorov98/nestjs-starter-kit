import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { SmsSendService } from './handler-send.service';
import { SmsSend } from '../entities/sms-send.entity';

@Processor('sms')
export class SmsSendProcessor {
  constructor(private readonly smsService: SmsSendService) {}

  @Process('send')
  async handleSend(job: Job<{ phone: string; message: string }>) {
    const success = await this.smsService.sendSms(job.data);

    // DB ga yozamiz
    // const sms = SmsSend.create({
    //   phoneNumber: job.data.phone,
    //   message: job.data.message,
    //   isSent: success,
    // });
   // await sms.save();
  }
}
