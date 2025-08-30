import { IsString, IsNotEmpty, IsUUID, ArrayNotEmpty, ArrayUnique, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role nomi, noyob bo‘lishi kerak',
  })
  @IsString()
  @IsNotEmpty({ message: 'Role nomi bo‘sh bo‘lishi mumkin emas' })
  name: string;
}
