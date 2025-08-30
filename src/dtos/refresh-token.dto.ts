import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({ example: "refresh-token-string", description: "Foydalanuvchi refresh tokeni" })
  @IsNotEmpty()
  refreshToken: string;
}
