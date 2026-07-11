import fs from 'fs-extra';
import path from 'path';
import { ConfigSchema } from './types';
import type { Config } from './types';

export class ConfigManager {
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

  async create(defaults: Partial<Config> = {}): Promise<Config> {
    const config: Config = {
      primitives: [],
      style: 'default',
      TypeScript: true,
      registry: 'https://registry.agentcn.dev',
      versions: {},
      ...defaults
    };
    await this.save(config);
    return config;
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

  async removePrimitive(name: string): Promise<void> {
    const config = await this.load();
    config.primitives = config.primitives.filter(p => p !== name);
    if (config.versions) {
      delete config.versions[name];
    }
    await this.save(config);
  }

  async getPrimitives(): Promise<string[]> {
    const config = await this.load();
    return config.primitives;
  }

  async hasPrimitive(name: string): Promise<boolean> {
    const config = await this.load();
    return config.primitives.includes(name);
  }
}
