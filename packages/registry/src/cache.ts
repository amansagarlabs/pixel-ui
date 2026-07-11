import fs from 'fs-extra';
import path from 'path';

export class CacheManager {
  private cacheDir: string;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
  }

  async get<T>(key: string): Promise<T | null> {
    const filePath = this.getFilePath(key);
    if (!await fs.pathExists(filePath)) {
      return null;
    }
    return fs.readJson(filePath);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await fs.ensureDir(this.cacheDir);
    const filePath = this.getFilePath(key);
    await fs.writeJson(filePath, value, { spaces: 2 });
  }

  async has(key: string): Promise<boolean> {
    const filePath = this.getFilePath(key);
    return fs.pathExists(filePath);
  }

  async clear(): Promise<void> {
    if (await fs.pathExists(this.cacheDir)) {
      await fs.remove(this.cacheDir);
    }
  }

  private getFilePath(key: string): string {
    const safeKey = key.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return path.join(this.cacheDir, `${safeKey}.json`);
  }
}
