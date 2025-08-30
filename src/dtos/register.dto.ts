import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'tulqin', 
    description: 'Foydalanuvchi username, bu maydon bo‘sh bo‘lmasligi kerak' 
  })
  @IsNotEmpty({ message: "Username bo‘sh bo‘lmasligi kerak" })
  username: string;
  
  @ApiProperty({ 
    example: 'tulqin484@example.com', 
    description: 'Foydalanuvchi email manzili, to‘g‘ri formatda bo‘lishi kerak' 
  })
  @IsEmail({}, { message: "Email noto‘g‘ri kiritildi" })
  email: string;

  @ApiProperty({ 
    example: '123456', 
    description: 'Foydalanuvchi paroli, kamida 6 ta belgidan iborat bo‘lishi kerak' 
  })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password: string;
}
