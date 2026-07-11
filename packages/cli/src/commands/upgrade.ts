import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
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
}

class RegistryClient {
  private baseUrl: string;

  constructor(config: { url: string }) {
    this.baseUrl = config.url.replace(/\/$/, '');
  }

  async getPrimitive(name: string): Promise<{ name: string; version: string; files: { name: string; path: string }[] }> {
    const response = await axios.get(`${this.baseUrl}/primitives/${name}.json`);
    return response.data;
  }

  async downloadFile(filePath: string): Promise<string> {
    const response = await axios.get(`${this.baseUrl}/files/${filePath}`);
    return response.data;
  }
}

export const upgradeCommand = new Command('upgrade')
  .description('Upgrade installed primitives to latest versions')
  .argument('[primitive]', 'Specific primitive to upgrade')
  .option('--registry <url>', 'Registry URL', 'https://registry.agentcn.dev')
  .option('--all', 'Upgrade all primitives')
  .action(async (primitive?: string, options?) => {
    const spinner = ora('Upgrading primitives...').start();

    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (!configExists) {
        spinner.fail(chalk.red('No agentcn.json found.'));
        process.exit(1);
      }

      const config = await configManager.load();
      const primitives = primitive ? [primitive] : config.primitives;

      const client = new RegistryClient({ url: options.registry });

      for (const p of primitives) {
        spinner.text = `Upgrading ${p}...`;
        
        try {
          const metadata = await client.getPrimitive(p);
          const currentVersion = config.versions?.[p] || '0.0.0';

          if (metadata.version !== currentVersion) {
            // Download and replace files
            const primitivesDir = path.join(process.cwd(), 'primitives', p);
            await fs.ensureDir(primitivesDir);

            for (const file of metadata.files) {
              const content = await client.downloadFile(`${p}/${file.path}`);
              const filePath = path.join(primitivesDir, file.name);
              await fs.writeFile(filePath, content);
            }

            // Update version in config
            if (!config.versions) config.versions = {};
            config.versions[p] = metadata.version;

            console.log(chalk.green(`  ✓ ${p}: ${currentVersion} → ${metadata.version}`));
          } else {
            console.log(chalk.gray(`  - ${p}: already at latest`));
          }
        } catch (error) {
          console.log(chalk.red(`  ✗ ${p}: failed to upgrade`));
        }
      }

      // Save updated config
      await configManager.save(config);

      spinner.succeed('Upgrade complete!');
    } catch (error) {
      spinner.fail(chalk.red(`Failed to upgrade primitives: ${(error as Error).message}`));
      process.exit(1);
    }
  });
