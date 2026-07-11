import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
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

  async save(config: Config): Promise<void> {
    await fs.writeJson(this.configPath, config, { spaces: 2 });
  }

  async removePrimitive(name: string): Promise<void> {
    const config = await this.load();
    config.primitives = config.primitives.filter((p: string) => p !== name);
    if (config.versions) {
      delete config.versions[name];
    }
    await this.save(config);
  }
}

export const removeCommand = new Command('remove')
  .description('Remove a primitive from your project')
  .argument('<primitive>', 'Primitive name to remove')
  .action(async (primitiveName: string) => {
    const spinner = ora(`Removing ${primitiveName}...`).start();

    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (!configExists) {
        spinner.fail(chalk.red('No agentcn.json found.'));
        process.exit(1);
      }

      const config = await configManager.load();

      if (!config.primitives.includes(primitiveName)) {
        spinner.fail(chalk.red(`${primitiveName} is not installed.`));
        process.exit(1);
      }

      // Remove files
      const primitivesDir = path.join(process.cwd(), 'primitives', primitiveName);
      if (await fs.pathExists(primitivesDir)) {
        await fs.remove(primitivesDir);
      }

      // Update config
      await configManager.removePrimitive(primitiveName);

      spinner.succeed(chalk.green(`Removed ${primitiveName}!`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to remove ${primitiveName}: ${(error as Error).message}`));
      process.exit(1);
    }
  });
