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

  async save(config: Config): Promise<void> {
    await fs.writeJson(this.configPath, config, { spaces: 2 });
  }

  async addPrimitive(name: string, version: string = '0.1.0'): Promise<void> {
    const config = await this.load();
    if (!config.primitives.includes(name)) {
      config.primitives.push(name);
    }
    if (!config.versions) {
      config.versions = {};
    }
    config.versions[name] = version;
    await this.save(config);
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

export const addCommand = new Command('add')
  .description('Add a primitive to your project')
  .argument('<primitive>', 'Primitive name to add')
  .option('-y, --yes', 'Skip prompts')
  .option('--registry <url>', 'Registry URL', 'https://registry.pixel-ui.amansagar.in')
  .option('--force', 'Overwrite existing')
  .action(async (primitiveName: string, options) => {
    const spinner = ora(`Adding ${primitiveName}...`).start();

    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (!configExists) {
        spinner.fail(chalk.red('No pixel-ui.json found. Run `pixel-ui init` first.'));
        process.exit(1);
      }

      const config = await configManager.load();

      if (config.primitives.includes(primitiveName) && !options.force) {
        spinner.fail(chalk.red(`${primitiveName} is already installed. Use --force to overwrite.`));
        process.exit(1);
      }

      spinner.text = `Fetching ${primitiveName} from registry...`;
      const client = new RegistryClient({ url: options.registry });

      let metadata;
      try {
        metadata = await client.getPrimitive(primitiveName);
      } catch (error) {
        spinner.fail(chalk.red(`Failed to fetch ${primitiveName}: ${(error as Error).message}`));
        process.exit(1);
      }

      spinner.text = 'Downloading files...';
      const primitivesDir = path.join(process.cwd(), 'primitives', primitiveName);
      await fs.ensureDir(primitivesDir);

      for (const file of metadata.files) {
        spinner.text = `Downloading ${file.name}...`;
        try {
          const content = await client.downloadFile(`${primitiveName}/${file.path}`);
          const filePath = path.join(primitivesDir, file.name);
          await fs.writeFile(filePath, content);
        } catch (error) {
          console.warn(chalk.yellow(`Warning: Failed to download ${file.name}: ${(error as Error).message}`));
        }
      }

      spinner.text = 'Updating configuration...';
      await configManager.addPrimitive(primitiveName, metadata.version);

      spinner.succeed(chalk.green(`Added ${primitiveName}!`));

      console.log('');
      console.log(chalk.cyan('Files added:'));
      metadata.files.forEach((file: { name: string }) => {
        console.log(chalk.gray(`  - ${file.name}`));
      });
      console.log('');
    } catch (error) {
      spinner.fail(chalk.red(`Failed to add ${primitiveName}: ${(error as Error).message}`));
      process.exit(1);
    }
  });
