import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3030,
  username: process.env.DB_USER || 'nestjs',
  password: process.env.DB_PASS || '6LckHgqAAAAANvE0pGH76XMD2EKX7sZPTCc57fK0Kb08jf1H8zbNZe1m',
  database: process.env.DB_NAME || 'nestjs',
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false,
};

export const AppDataSource = new DataSource(databaseConfig);
