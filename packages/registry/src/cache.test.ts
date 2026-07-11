import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { CacheManager } from './cache';

const TEST_CACHE_DIR = path.join(__dirname, '../test-cache');

describe('CacheManager', () => {
  beforeEach(async () => {
    await fs.ensureDir(TEST_CACHE_DIR);
  });

  afterEach(async () => {
    await fs.remove(TEST_CACHE_DIR);
  });

  it('should return null for missing key', async () => {
    const cache = new CacheManager(TEST_CACHE_DIR);
    const result = await cache.get('nonexistent');
    expect(result).toBeNull();
  });

  it('should set and get value', async () => {
    const cache = new CacheManager(TEST_CACHE_DIR);
    await cache.set('test', { foo: 'bar' });

    const result = await cache.get('test');
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should check if key exists', async () => {
    const cache = new CacheManager(TEST_CACHE_DIR);

    expect(await cache.has('test')).toBe(false);
    await cache.set('test', 'value');
    expect(await cache.has('test')).toBe(true);
  });

  it('should clear cache', async () => {
    const cache = new CacheManager(TEST_CACHE_DIR);
    await cache.set('test1', 'value1');
    await cache.set('test2', 'value2');

    await cache.clear();

    expect(await cache.has('test1')).toBe(false);
    expect(await cache.has('test2')).toBe(false);
  });
});
