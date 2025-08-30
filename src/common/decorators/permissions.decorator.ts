// src/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

/**
 * Route uchun kerakli permissionsni belgilash
 * Misol: @Permissions('create:user', 'update:user')
 */
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);
