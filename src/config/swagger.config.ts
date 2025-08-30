import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(' Starter Kit - NestJS')
    .setDescription(
      `API documentation\n\n` +
      `Created by Tulqin Muxtorov\n` +
      `Contact info:\n` +
      `- Phone: +998888041404\n` +
      `- Email: tulqin484@gmail.com\n` +
      `- Telegram: https://t.me/tulqinmuxtorov77\n` +
      `- Website: https://nestdevs.uz\n` +
      `- Working hours: Dushanbadan Jumagacha, 09:00 dan 18:00 gacha\n\n` +
      `Social media:\n` +
      `- WhatsApp: +998888041404\n` +
      `- Facebook: https://facebook.com/tulqin.muxtorov.52\n` +
      `- Instagram: https://www.instagram.com/muxtorov_tulqin\n` +
      `- Telegram Channel: https://t.me/muxtorov_dev\n`
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT',
    )
    .setContact(
      'Tulqin Muxtorov',
      'https://nestdevs.uz',
      'tulqin484@gmail.com'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
