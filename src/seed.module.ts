import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './services/seed.service';
import { SeedCommand } from './commands/seed.command';
import { AppDataSource } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  providers: [SeedService, SeedCommand],
})
export class SeedModule {}
