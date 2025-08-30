import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Route uchun kerakli permissionlarni olish
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) throw new ForbiddenException('Foydalanuvchi topilmadi');

    // User permissionsni rollari orqali olish
    const userPermissions = user.roles?.flatMap(role => role.permissions?.map(p => p.name) || []) || [];

    // Dublikatlarni olib tashlash
    const uniquePermissions = [...new Set(userPermissions)];

    // Kerakli permissions borligini tekshirish
    const hasPermission = requiredPermissions.every(p => uniquePermissions.includes(p));

    if (!hasPermission) {
      throw new ForbiddenException('Sizda bu amalni bajarish uchun ruxsat yo‘q');
    }

    return true;
  }
}
