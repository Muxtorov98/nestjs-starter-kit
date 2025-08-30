import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
  ) {}

  findAll() {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  findOne(id: string) {
    return this.roleRepo.findOne({ where: { id }, relations: ['permissions'] });
  }

  async create(name: string) {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    if (!role) return null;
    return this.roleRepo.remove(role);
  }

   // ✅ Rolega bir nechta permission qo‘shish
  async assignPermissions(roleId: string, permissionIds: string[]) {
    const role = await this.findOne(roleId);
    if (!role) throw new NotFoundException('Role not found');

    const permissions = await this.permRepo.findByIds(permissionIds);
    if (!permissions.length) throw new NotFoundException('Permissions not found');

    role.permissions = [...(role.permissions || []), ...permissions];
    return this.roleRepo.save(role);
  }

  // ✅ Role permissions ni yangilash (eski → yangi)
  async updatePermissions(roleId: string, permissionIds: string[]) {
    const role = await this.findOne(roleId);
    if (!role) throw new NotFoundException('Role not found');

    const permissions = await this.permRepo.findByIds(permissionIds);
    role.permissions = permissions;
    return this.roleRepo.save(role);
  }
}
