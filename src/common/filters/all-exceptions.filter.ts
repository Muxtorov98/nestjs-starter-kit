import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessages: string[] = [];

    // Class-validator errorlarini ham 422 ga o‘tkazamiz
    if (exception instanceof BadRequestException) {
      status = 422;
      const res = exception.getResponse();
      if (typeof res === 'string') {
        errorMessages = [res];
      } else if (Array.isArray((res as any).message)) {
        errorMessages = (res as any).message;
      } else if (typeof res === 'object' && (res as any).message) {
        errorMessages = [String((res as any).message)];
      }
    } 
    // Database unique constraint error
    else if (exception instanceof QueryFailedError) {
      status = 422;
      const detail: string = (exception as any).detail || '';

      const match = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
      if (match) {
        const field = match[1];
        errorMessages = [`${field} allaqachon mavjud`];
      } else {
        errorMessages = [exception.message];
      }
    } 
    // Oddiy HttpException
    else if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        errorMessages = [res];
      } else if (Array.isArray((res as any).message)) {
        errorMessages = (res as any).message;
      } else if (typeof res === 'object' && (res as any).message) {
        errorMessages = [String((res as any).message)];
      }
    } 
    // Unknown errors
    else {
      errorMessages = [exception.message || 'Internal server error'];
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      messages: errorMessages,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
