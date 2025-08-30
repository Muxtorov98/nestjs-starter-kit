import { IsString, IsNotEmpty, IsUUID, ArrayNotEmpty, ArrayUnique, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionsDto {
  @ApiProperty({
    example: 'uuid-v4-string',
    description: 'Role ning unikal identifikatori',
  })
  @IsUUID('4', { message: 'Role ID noto‘g‘ri formatda' })
  roleId: string;

  @ApiProperty({
    example: ['uuid-v4-string1', 'uuid-v4-string2'],
    description: 'Yangilangan permission ID lar ro‘yxati',
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Permissionlar ro‘yxati bo‘sh bo‘lishi mumkin emas' })
  @ArrayUnique({ message: 'Permission ID lar takrorlanmasligi kerak' })
  @IsUUID('4', { each: true, message: 'Har bir permission ID noto‘g‘ri formatda' })
  permissions: string[];
}