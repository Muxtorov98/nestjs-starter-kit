import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { SmsController } from './controllers/sms.controller';
import { SmsSendProcessor } from './messages/sms-send.processor';
import { SmsSend } from './entities/sms-send.entity';

import { MessageBuilderService } from './messages/message-builder.service';
import { MessageSenderService } from './messages/message-sender.service';
import { SmsSendService } from './messages/handler-send.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SmsSend]),
    BullModule.registerQueue({
      name: 'sms',
    }),
    HttpModule,
  ],
  controllers: [SmsController],
  providers: [
    SmsSendProcessor,
    MessageBuilderService,
    MessageSenderService,
    SmsSendService,
  ],
  exports: [SmsSendService],
})
export class SmsModule {}
