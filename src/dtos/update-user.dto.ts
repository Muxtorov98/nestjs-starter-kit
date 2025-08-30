import { IsEmail, IsOptional, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "tulqin", description: "Foydalanuvchi username" })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ example: "newpassword", description: "Foydalanuvchi paroli, kamida 6 ta belgidan iborat" })
  @IsOptional()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password?: string;

  @ApiPropertyOptional({ example: "tulqin@example.com", description: "Foydalanuvchi email" })
  @IsOptional()
  @IsEmail({}, { message: "Email noto‘g‘ri kiritildi" })
  email?: string;
}
