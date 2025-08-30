import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dtos/register.dto";
import { LoginDto } from "../dtos/login.dto";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { User } from "../entities/user.entity";
import { UserResource } from "../resources/user.resource";

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: 'Foydalanuvchi ro‘yxatdan o‘tadi' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
  async register(@Body() dto: RegisterDto) {
    const { user, accessToken, refreshToken } = await this.authService.register(dto);
    return {
      success: true,
      user: UserResource.toObject(user),
      token: accessToken,
      refreshToken,
    };
  }

  @Post("login")
  @ApiOperation({ summary: 'Foydalanuvchi tizimga kiradi' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi tizimga kirdi' })
  async login(@Body() dto: LoginDto) {
    const { user, accessToken, refreshToken } = await this.authService.login(dto);
    return {
      success: true,
      user: UserResource.toObject(user),
      token: accessToken,
      refreshToken,
    };
  }

  @Post("refresh")
  @ApiOperation({ summary: 'Refresh token orqali access token yangilanadi' })
  @ApiResponse({ status: 200, description: 'Token yangilandi' })
  async refresh(@Body() dto: RefreshTokenDto) {
    const tokens = await this.authService.refreshToken(dto.refreshToken);
    return { success: true, ...tokens };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Hozirgi foydalanuvchi haqida ma’lumot' })
  async me(@CurrentUser() user: User) {
    return { success: true, user: UserResource.toObject(user) };
  }
}
