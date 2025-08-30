import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from '../services/permissions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreatePermissionDto } from '../dtos/create.permission.dto';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Permissions')
@ApiBearerAuth('JWT')
@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha permissions olish' })
  @ApiBearerAuth('JWT')
  @Permissions('read:permissions')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Permission ma’lumotini olish' })
  @ApiBearerAuth('JWT')
  @Permissions('read:permissions')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Yangi permission yaratish' })
  @ApiBearerAuth('JWT')
  @Permissions('create:permissions')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Permission o‘chirish' })
  @ApiBearerAuth('JWT')
  @Permissions('remove:permissions')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
