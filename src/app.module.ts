import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { SeedModule } from './seed.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/user.controller';
import { RolesController } from './controllers/role.controller';
import { PermissionsController } from './controllers/permission.controller';
import { UsersService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { AppDataSource } from './config/database.config';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { IsUniqueConstraint } from "./common/validators/is-unique.validator";
import { JwtConfig } from './config/jwt.config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    SeedModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.registerAsync(JwtConfig),
  ],
  controllers: [
    AppController,
    UsersController,
    RolesController,
    PermissionsController,
    AuthController,
  ],
  providers: [
    AppService,
    UsersService,
    RolesService,
    PermissionsService,
    AuthService,
    IsUniqueConstraint,
    JwtStrategy
  ],
})
export class AppModule {}
