import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { z } from 'zod';

const ConfigSchema = z.object({
  primitives: z.array(z.string()),
  style: z.string().default('default'),
  TypeScript: z.boolean().default(true),
  registry: z.string().default('https://registry.pixel-ui.amansagar.in'),
  versions: z.record(z.string()).optional()
});

type Config = z.infer<typeof ConfigSchema>;

class ConfigManager {
  private configPath: string;

  constructor(projectDir?: string) {
    this.configPath = path.join(projectDir || process.cwd(), 'pixel-ui.json');
  }

  async exists(): Promise<boolean> {
    return fs.pathExists(this.configPath);
  }

  async load(): Promise<Config> {
    if (!await this.exists()) {
      throw new Error('No pixel-ui.json found. Run `pixel-ui init` first.');
    }
    const data = await fs.readJson(this.configPath);
    return ConfigSchema.parse(data);
  }
}

export const listCommand = new Command('list')
  .description('List installed primitives')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show details')
  .action(async (options) => {
    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (!configExists) {
        console.log(chalk.red('No pixel-ui.json found. Run `pixel-ui init` first.'));
        process.exit(1);
      }

      const config = await configManager.load();

      if (config.primitives.length === 0) {
        console.log(chalk.yellow('No primitives installed.'));
        console.log('');
        console.log(chalk.cyan('Install primitives with:'));
        console.log(chalk.gray('  npx pixel-ui add <primitive>'));
        return;
      }

      if (options.json) {
        const output = {
          primitives: config.primitives.map((name: string) => ({
            name,
            version: config.versions?.[name] || '0.0.0'
          }))
        };
        console.log(JSON.stringify(output, null, 2));
        return;
      }

      console.log(chalk.cyan('Installed primitives:'));
      console.log('');

      for (const name of config.primitives) {
        const version = config.versions?.[name] || '0.0.0';
        console.log(chalk.white(`  - ${name} (${version})`));

        if (options.verbose) {
          const primitiveDir = path.join(process.cwd(), 'primitives', name);
          if (await fs.pathExists(primitiveDir)) {
            const files = await fs.readdir(primitiveDir);
            console.log(chalk.gray(`    Files: ${files.length}`));

            const registryPath = path.join(primitiveDir, 'registry.json');
            if (await fs.pathExists(registryPath)) {
              const registry = await fs.readJson(registryPath);
              if (registry.category) {
                console.log(chalk.gray(`    Category: ${registry.category}`));
              }
            }
          }
        }
      }

      console.log('');
    } catch (error) {
      console.error(chalk.red(`Failed to list primitives: ${(error as Error).message}`));
      process.exit(1);
    }
  });
