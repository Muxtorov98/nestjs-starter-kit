import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'read:users',
    description: 'Permission nomi, noyob bo‘lishi kerak',
  })
  @IsString()
  @IsNotEmpty({ message: 'Permission nomi bo‘sh bo‘lishi mumkin emas' })
  name: string;
}
