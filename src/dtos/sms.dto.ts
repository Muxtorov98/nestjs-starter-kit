import { IsString } from 'class-validator';

export class SmsDto {
  @IsString()
  phone: string;

  @IsString()
  message: string;
}
