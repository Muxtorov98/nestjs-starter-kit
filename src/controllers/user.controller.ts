import {
  Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from "../services/user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { AssignRoleDto } from "../dtos/user.AssignRole.dto";
import { UserResource } from "../resources/user.resource";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:user')
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati' })
  async findAll() {
    const users = await this.usersService.findAll();
    return UserResource.toArray(users);
  }

  @Get(":id")
  @ApiOperation({ summary: 'Foydalanuvchi ma’lumotini olish' })
  @Permissions('read:user')
  @ApiBearerAuth('JWT')
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException("User not found");
    return UserResource.toObject(user);
  }

  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @Permissions('create:user')
  @ApiBearerAuth('JWT')
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);
    return UserResource.toObject(user);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Foydalanuvchi ma’lumotini yangilash' })
  @Permissions('update:user')
  @ApiBearerAuth('JWT')
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(id, data);
    if (!user) throw new NotFoundException("User not found");
    return UserResource.toObject(user);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @Permissions('remove:user')
  @ApiBearerAuth('JWT')
  async remove(@Param("id") id: string) {
    const user = await this.usersService.remove(id);
    return { success: true, deletedId: user.id };
  }

  @Post("assign-role")
  @ApiOperation({ summary: 'Foydalanuvchiga role berish' })
  @Permissions('assign:role:user')
  @ApiBearerAuth('JWT')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    const { userId, roleIds } = assignRoleDto;
    const user = await this.usersService.assignRoles(userId, roleIds);
    return UserResource.toObject(user);
  }
}
