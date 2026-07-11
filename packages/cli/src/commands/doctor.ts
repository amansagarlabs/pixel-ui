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

interface Check {
  name: string;
  check: () => Promise<{ pass: boolean; message: string; fix?: string }>;
}

async function runChecks(): Promise<{ name: string; pass: boolean; message: string; fix?: string }[]> {
  const checks: Check[] = [
    {
      name: 'Node.js version',
      check: async () => {
        const version = process.version;
        const major = parseInt(version.slice(1));
        return {
          pass: major >= 18,
          message: version,
          fix: major < 18 ? 'Upgrade to Node.js 18 or higher' : undefined
        };
      }
    },
    {
      name: 'npm version',
      check: async () => {
        try {
          const version = execSync('npm --version', { encoding: 'utf-8' }).trim();
          return { pass: true, message: version };
        } catch {
          return { pass: false, message: 'Not found', fix: 'Install npm' };
        }
      }
    },
    {
      name: 'pixel-ui.json',
      check: async () => {
        const exists = await fs.pathExists('pixel-ui.json');
        return {
          pass: exists,
          message: exists ? 'Found' : 'Not found',
          fix: exists ? undefined : 'Run `pixel-ui init`'
        };
      }
    },
    {
      name: 'Primitives directory',
      check: async () => {
        const exists = await fs.pathExists('primitives');
        return {
          pass: exists,
          message: exists ? 'Found' : 'Not found',
          fix: exists ? undefined : 'Run `pixel-ui init`'
        };
      }
    }
  ];

  const results: { name: string; pass: boolean; message: string; fix?: string }[] = [];

  for (const check of checks) {
    const result = await check.check();
    results.push({ name: check.name, ...result });
  }

  return results;
}

async function checkPrimitives(): Promise<{ name: string; pass: boolean; message: string; fix?: string }[]> {
  const results: { name: string; pass: boolean; message: string; fix?: string }[] = [];
  const configManager = new ConfigManager();

  if (!await configManager.exists()) {
    return results;
  }

  const config = await configManager.load();

  for (const primitive of config.primitives) {
    const primitiveDir = path.join(process.cwd(), 'primitives', primitive);

    if (!await fs.pathExists(primitiveDir)) {
      results.push({
        name: primitive,
        pass: false,
        message: 'Directory not found',
        fix: `Run \`npx pixel-ui add ${primitive}\``
      });
      continue;
    }

    const testFile = path.join(primitiveDir, `${primitive}.test.ts`);
    const hasTests = await fs.pathExists(testFile);

    if (!hasTests) {
      results.push({
        name: primitive,
        pass: false,
        message: 'No tests found',
        fix: `Add ${primitive}.test.ts`
      });
    } else {
      results.push({
        name: primitive,
        pass: true,
        message: 'Tests found'
      });
    }
  }

  return results;
}

export const doctorCommand = new Command('doctor')
  .description('Check your environment for issues')
  .option('--fix', 'Auto-fix issues')
  .action(async (options) => {
    console.log(chalk.cyan('pixel-ui Doctor'));
    console.log('');

    const results = await runChecks();
    const primitiveResults = await checkPrimitives();
    const allResults = [...results, ...primitiveResults];

    for (const result of allResults) {
      if (result.pass) {
        console.log(chalk.green(`  ✔ ${result.name}: ${result.message}`));
      } else if (result.fix) {
        console.log(chalk.yellow(`  ⚠ ${result.name}: ${result.message}`));
        console.log(chalk.gray(`    Fix: ${result.fix}`));
      } else {
        console.log(chalk.red(`  ✗ ${result.name}: ${result.message}`));
      }
    }

    console.log('');

    const failures = allResults.filter(r => !r.pass);
    if (failures.length === 0) {
      console.log(chalk.green('All checks passed!'));
    } else {
      console.log(chalk.yellow(`${failures.length} issue(s) found.`));
    }
  });
