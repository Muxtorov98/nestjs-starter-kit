import { IsString, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({
    description: 'Foydalanuvchi IDsi',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Role IDlar ro‘yxati',
    example: ['role-id-1', 'role-id-2'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'roleIds bo‘sh bo‘lishi mumkin emas' })
  @ArrayUnique({ message: 'roleIds ichida takroriy elementlar bo‘lishi mumkin emas' })
  @IsString({ each: true })
  roleIds: string[];
}
