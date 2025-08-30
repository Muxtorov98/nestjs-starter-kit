import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateRoleDto } from '../dtos/role.create.dto';
import { AssignPermissionsDto,  } from '../dtos/ role.assignPermissions.dto';
import { UpdatePermissionsDto } from '../dtos/role.updatePermissions.dto';
import { Permissions } from '../common/decorators/permissions.decorator';


@ApiTags('Roles')
@ApiBearerAuth('JWT')
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha rollarni olish' })
  @ApiBearerAuth('JWT')
  @Permissions('read:roles')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Role ma’lumotini olish' })
  @ApiBearerAuth('JWT')
  @Permissions('read:roles')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Yangi role yaratish' })
  @ApiBearerAuth('JWT')
  @Permissions('create:roles')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Role o‘chirish' })
  @ApiBearerAuth('JWT')
  @Permissions('remove:roles')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Post('assign-permissions')
  @ApiOperation({ summary: 'Rolega permission qo‘shish' })
  @ApiBearerAuth('JWT')
  @Permissions('assign:permissions:roles')
  assignPermissions(@Body() assignPermissionsDto: AssignPermissionsDto) {
    return this.rolesService.assignPermissions(assignPermissionsDto.roleId, assignPermissionsDto.permissions);
  }

  @Put('update-permissions')
  @ApiOperation({ summary: 'Role permissions yangilash' })
  @ApiBearerAuth('JWT')
  @Permissions('update:permissions:roles')
  updatePermissions(@Body() updatePermissionsDto: UpdatePermissionsDto) {
    return this.rolesService.updatePermissions(updatePermissionsDto.roleId, updatePermissionsDto.permissions);
  }
}
