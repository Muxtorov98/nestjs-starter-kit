import { Command, CommandRunner } from 'nest-commander';
import { SeedService } from '../services/seed.service';

@Command({ name: 'seed', description: 'Run database seed scripts' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedService: SeedService) {
    super();
  }

  async run(): Promise<void> {
    console.log('Seed command started...');
    await this.seedService.seed();
    console.log('Seed command finished.');
  }
}
