import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageBuilderService {
  buildMessage(phone: string, message: string) {
    return {
      messages: [
        {
          recipient: phone,
          'message-id': 'abc000000001',
          sms: {
            originator: '3700',
            content: { text: message },
          },
        },
      ],
    };
  }
}
