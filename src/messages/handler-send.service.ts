import { Injectable } from '@nestjs/common';
import { MessageBuilderService } from './message-builder.service';
import { MessageSenderService } from './message-sender.service';
import { SmsDto } from '../dtos/sms.dto';

@Injectable()
export class SmsSendService {
  constructor(
    private readonly builder: MessageBuilderService,
    private readonly sender: MessageSenderService,
  ) {}

  async sendSms(dto: SmsDto): Promise<boolean> {
    const message = this.builder.buildMessage(dto.phone, dto.message);
    return this.sender.sendMessage(message);
  }
}
