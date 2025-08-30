import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private permRepo: Repository<Permission>) {}

  findAll() {
    return this.permRepo.find();
  }

  findOne(id: string) {
    return this.permRepo.findOne({ where: { id } });
  }

  async create(name: string) {
    const perm = this.permRepo.create({ name });
    return this.permRepo.save(perm);
  }

  async remove(id: string) {
    const perm = await this.findOne(id);
    if (!perm) return null;
    return this.permRepo.remove(perm);
  }
}
