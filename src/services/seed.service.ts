import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    console.log('Seeding started...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Parollarni hash qilish
      const adminPassword = await bcrypt.hash('admin123', 10);
      const managerPassword = await bcrypt.hash('manager123', 10);
      const userPassword = await bcrypt.hash('user123', 10);

      // Roles yaratish
      await queryRunner.query(`
        INSERT INTO roles (id, name) VALUES
          (uuid_generate_v4(), 'admin'),
          (uuid_generate_v4(), 'manager'),
          (uuid_generate_v4(), 'user')
        ON CONFLICT (name) DO NOTHING
      `);

      // Permissions yaratish
      await queryRunner.query(`
        INSERT INTO permissions (id, name) VALUES
          (uuid_generate_v4(), 'create:user'),
          (uuid_generate_v4(), 'read:user'),
          (uuid_generate_v4(), 'update:user'),
          (uuid_generate_v4(), 'delete:user'),
          (uuid_generate_v4(), 'assign:role:user'),
          (uuid_generate_v4(), 'create:post'),
          (uuid_generate_v4(), 'read:post'),
          (uuid_generate_v4(), 'update:post'),
          (uuid_generate_v4(), 'delete:post'),
          (uuid_generate_v4(), 'publish:post')
        ON CONFLICT (name) DO NOTHING
      `);

      // Users yaratish
      await queryRunner.query(`
        INSERT INTO users (id, username, password, email, created_at, updated_at) VALUES
          (uuid_generate_v4(), 'admin', $1, 'admin@example.com', now(), now()),
          (uuid_generate_v4(), 'manager', $2, 'manager@example.com', now(), now()),
          (uuid_generate_v4(), 'user', $3, 'user@example.com', now(), now())
        ON CONFLICT (username) DO NOTHING
      `, [adminPassword, managerPassword, userPassword]);

      // Role va permission IDlarini olish
      const roles = await queryRunner.query(`SELECT id, name FROM roles`);
      const permissions = await queryRunner.query(`SELECT id, name FROM permissions`);
      const users = await queryRunner.query(`SELECT id, username FROM users`);

      const getRoleId = (roleName: string) => roles.find(r => r.name === roleName)?.id;
      const getPermissionId = (permName: string) => permissions.find(p => p.name === permName)?.id;
      const getUserId = (username: string) => users.find(u => u.username === username)?.id;

      // Role va permissionlarni bog‘lash (role_permissions)
      // Admin barcha permissionlarga ega
      for (const perm of permissions) {
        await queryRunner.query(`
          INSERT INTO role_permissions (role_id, permission_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [getRoleId('admin'), perm.id]);
      }

      // Manager permissions
      const managerPerms = ['create:post', 'read:post', 'update:post', 'delete:post', 'publish:post'];
      for (const permName of managerPerms) {
        const permId = getPermissionId(permName);
        if (permId) {
          await queryRunner.query(`
            INSERT INTO role_permissions (role_id, permission_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `, [getRoleId('manager'), permId]);
        }
      }

      // User permissions
      const userPerms = ['read:user'];
      for (const permName of userPerms) {
        const permId = getPermissionId(permName);
        if (permId) {
          await queryRunner.query(`
            INSERT INTO role_permissions (role_id, permission_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `, [getRoleId('user'), permId]);
        }
      }

      // User va role ni bog‘lash (user_roles)
      for (const username of ['admin', 'manager', 'user']) {
        const userId = getUserId(username);
        const roleId = getRoleId(username); // role nomi user nomi bilan bir xil
        if (userId && roleId) {
          await queryRunner.query(`
            INSERT INTO user_roles (user_id, role_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `, [userId, roleId]);
        }
      }

      await queryRunner.commitTransaction();
      console.log('Seed data inserted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error seeding data:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
