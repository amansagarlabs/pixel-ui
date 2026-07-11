import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import prompts from 'prompts';
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

  async create(defaults: Partial<Config> = {}): Promise<Config> {
    const config: Config = {
      primitives: [],
      style: 'default',
      TypeScript: true,
      registry: 'https://registry.pixel-ui.amansagar.in',
      versions: {},
      ...defaults
    };
    await fs.writeJson(this.configPath, config, { spaces: 2 });
    return config;
  }
}

export const initCommand = new Command('init')
  .description('Initialize a new pixel-ui project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (options) => {
    const spinner = ora('Initializing pixel-ui project...').start();

    try {
      const configManager = new ConfigManager();
      const configExists = await configManager.exists();

      if (configExists && !options.yes) {
        spinner.stop();
        const response = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'pixel-ui.json already exists. Overwrite?',
          initial: false
        });

        if (!response.overwrite) {
          console.log(chalk.yellow('Aborted.'));
          process.exit(0);
        }
        spinner.start();
      }

      let config = {
        primitives: [] as string[],
        TypeScript: true,
        style: 'default',
        registry: 'https://registry.pixel-ui.amansagar.in'
      };

      if (!options.yes) {
        spinner.stop();
        const response = await prompts([
          {
            type: 'multiselect',
            name: 'primitives',
            message: 'Which primitives would you like to install?',
            choices: [
              { title: 'planner - Task decomposition', value: 'planner', selected: true },
              { title: 'memory - Short/long-term memory', value: 'memory', selected: false },
              { title: 'browser - Web browsing', value: 'browser', selected: false },
              { title: 'evaluator - Output evaluation', value: 'evaluator', selected: false },
              { title: 'reflection - Self-improvement', value: 'reflection', selected: false },
              { title: 'retry - Error handling', value: 'retry', selected: false }
            ]
          },
          {
            type: 'confirm',
            name: 'TypeScript',
            message: 'Use TypeScript?',
            initial: true
          }
        ]);

        config.primitives = response.primitives || [];
        config.TypeScript = response.TypeScript;
        spinner.start();
      }

      spinner.text = 'Creating configuration...';
      await configManager.create(config);

      spinner.text = 'Creating primitives directory...';
      const primitivesDir = path.join(process.cwd(), 'primitives');
      await fs.ensureDir(primitivesDir);

      spinner.succeed(chalk.green('pixel-ui project initialized!'));

      console.log('');
      console.log(chalk.cyan('Next steps:'));
      console.log('');

      if (config.primitives.length > 0) {
        console.log(chalk.white('  1. Install primitives:'));
        config.primitives.forEach((p) => {
          console.log(chalk.gray(`     npx pixel-ui add ${p}`));
        });
      } else {
        console.log(chalk.white('  1. Add primitives:'));
        console.log(chalk.gray('     npx pixel-ui add <primitive>'));
      }

      console.log('');
      console.log(chalk.white('  2. Start building your AI agent!'));
      console.log('');
    } catch (error) {
      spinner.fail(chalk.red(`Failed to initialize project: ${(error as Error).message}`));
      process.exit(1);
    }
  });
