import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ["roles", "roles.permissions"],
    });
  }

  findOne(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ["roles", "roles.permissions"],
    });
  }

  // ✅ Create user with hashed password
  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    // Agar parol yangilanayotgan bo‘lsa, hash qilamiz
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepo.remove(user);
  }

  async assignRoles(userId: string, roleIds: string[]) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException("User not found");

    const roles = await this.roleRepo.findByIds(roleIds);
    if (!roles.length) throw new NotFoundException("Roles not found");

    user.roles = [...(user.roles || []), ...roles];
    return this.userRepo.save(user);
  }
}
