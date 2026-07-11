import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { z } from 'zod';

const ConfigSchema = z.object({
  primitives: z.array(z.string()),
  style: z.string().default('default'),
  TypeScript: z.boolean().default(true),
  registry: z.string().default('https://registry.agentcn.dev'),
  versions: z.record(z.string()).optional()
});

type Config = z.infer<typeof ConfigSchema>;

class ConfigManager {
  private configPath: string;

  constructor(projectDir?: string) {
    this.configPath = path.join(projectDir || process.cwd(), 'agentcn.json');
  }

  async exists(): Promise<boolean> {
    return fs.pathExists(this.configPath);
  }

  async load(): Promise<Config> {
    if (!await this.exists()) {
      throw new Error('No agentcn.json found. Run `agentcn init` first.');
    }
    const data = await fs.readJson(this.configPath);
    return ConfigSchema.parse(data);
  }
}

export const testCommand = new Command('test')
  .description('Run tests for installed primitives')
  .argument('[primitive]', 'Specific primitive to test')
  .option('--coverage', 'Show coverage')
  .option('--verbose', 'Verbose output')
  .action(async (primitive?: string, options?) => {
    console.log(chalk.cyan('Running tests...'));
    console.log('');

    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (!configExists) {
        console.log(chalk.red('No agentcn.json found. Run `agentcn init` first.'));
        process.exit(1);
      }

      const config = await configManager.load();
      const primitives = primitive ? [primitive] : config.primitives;

      let passed = 0;
      let failed = 0;

      for (const p of primitives) {
        const testFile = path.join(process.cwd(), 'primitives', p, `${p}.test.ts`);
        
        if (await fs.pathExists(testFile)) {
          try {
            console.log(chalk.gray(`Testing ${p}...`));
            execSync(`npx vitest run ${testFile}`, { stdio: 'inherit' });
            passed++;
            console.log(chalk.green(`  ✓ ${p}`));
          } catch {
            failed++;
            console.log(chalk.red(`  ✗ ${p}`));
          }
        } else {
          console.log(chalk.yellow(`  - ${p} (no tests found)`));
        }
      }

      console.log('');
      console.log(chalk.cyan('Test Summary:'));
      console.log(chalk.green(`  Passed: ${passed}`));
      if (failed > 0) {
        console.log(chalk.red(`  Failed: ${failed}`));
      }
    } catch (error) {
      console.error(chalk.red(`Failed to run tests: ${(error as Error).message}`));
      process.exit(1);
    }
  });
