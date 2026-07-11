import axios from 'axios';
import { PrimitiveMetadataSchema } from './types';
import type { PrimitiveMetadata } from './types';
import { CacheManager } from './cache';

export interface RegistryClientConfig {
  url: string;
  cacheDir?: string;
  timeout?: number;
}

export class RegistryClient {
  private baseUrl: string;
  private cache: CacheManager;
  private timeout: number;

  constructor(config: RegistryClientConfig) {
    this.baseUrl = config.url.replace(/\/$/, '');
    this.cache = new CacheManager(config.cacheDir || '.agentcn-cache');
    this.timeout = config.timeout || 30000;
  }

  async getPrimitive(name: string): Promise<PrimitiveMetadata> {
    const cacheKey = `primitive_${name}`;
    const cached = await this.cache.get<PrimitiveMetadata>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/primitives/${name}.json`, {
        timeout: this.timeout
      });
      const metadata = PrimitiveMetadataSchema.parse(response.data);
      await this.cache.set(cacheKey, metadata);
      return metadata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Primitive "${name}" not found in registry`);
        }
        throw new Error(`Failed to fetch primitive "${name}": ${error.message}`);
      }
      throw error;
    }
  }

  async listPrimitives(): Promise<string[]> {
    const cacheKey = 'primitives_list';
    const cached = await this.cache.get<string[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/primitives.json`, {
        timeout: this.timeout
      });
      const list = response.data as string[];
      await this.cache.set(cacheKey, list);
      return list;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch primitives list: ${error.message}`);
      }
      throw error;
    }
  }

  async downloadFile(filePath: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/files/${filePath}`, {
        timeout: this.timeout
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to download file "${filePath}": ${error.message}`);
      }
      throw error;
    }
  }

  async clearCache(): Promise<void> {
    await this.cache.clear();
  }
}
