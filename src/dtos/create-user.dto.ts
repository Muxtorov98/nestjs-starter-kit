import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "tulqin", description: "Foydalanuvchi username" })
  @IsNotEmpty({ message: "Username bo‘sh bo‘lmasligi kerak" })
  username: string;

  @ApiProperty({ example: "123456", description: "Foydalanuvchi paroli, kamida 6 ta belgidan iborat" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password: string;

  @ApiProperty({ example: "tulqin@example.com", description: "Foydalanuvchi email" })
  @IsEmail({}, { message: "Email noto‘g‘ri kiritildi" })
  email: string;
}
