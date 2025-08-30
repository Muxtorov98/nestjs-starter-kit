// src/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
