import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MessageSenderService {
  constructor(private readonly http: HttpService) {}

  async sendMessage(message: any): Promise<boolean> {
    const smsUrl = process.env.SMS_URL || 'https://send.smsxabar.uz/broker-api/send';
    const username = process.env.SMS_USERNAME || 'username';
    const password = process.env.SMS_PASSWORD || 'password';

    try {
      const response = await firstValueFrom(
        this.http.post(smsUrl, message, {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' +
              Buffer.from(`${username}:${password}`).toString('base64'),
          },
        }),
      );

      return response.status === 200;
    } catch (e) {
      console.error('SMS send error:', e.message);
      return false;
    }
  }
}
