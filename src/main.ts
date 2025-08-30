// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { setupSecurity } from './config/security.config'; // Note: we exported function setupSecurity
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security (helmet, cors,rate-limit, xss, compression)
  setupSecurity(app);

  // DTO validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Exception Filter / Interceptor / Swagger
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
