import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "tulqin@example.com", description: "Foydalanuvchi email" })
  @IsEmail({}, { message: "Email noto‘g‘ri kiritildi" })
  email: string;

  @ApiProperty({ example: "123456", description: "Foydalanuvchi paroli" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi kerak" })
  password: string;
}
