import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { ConfigManager } from './config';

const TEST_DIR = path.join(__dirname, '../test-temp');

describe('ConfigManager', () => {
  beforeEach(async () => {
    await fs.ensureDir(TEST_DIR);
  });

  afterEach(async () => {
    await fs.remove(TEST_DIR);
  });

  it('should check if config exists', async () => {
    const manager = new ConfigManager(TEST_DIR);
    expect(await manager.exists()).toBe(false);
  });

  it('should create config with defaults', async () => {
    const manager = new ConfigManager(TEST_DIR);
    const config = await manager.create();

    expect(config.primitives).toEqual([]);
    expect(config.TypeScript).toBe(true);
    expect(config.registry).toBe('https://registry.agentcn.dev');
  });

  it('should load config', async () => {
    const manager = new ConfigManager(TEST_DIR);
    await manager.create();

    const config = await manager.load();
    expect(config.primitives).toEqual([]);
  });

  it('should throw when config not found', async () => {
    const manager = new ConfigManager(TEST_DIR);
    await expect(manager.load()).rejects.toThrow('No agentcn.json found');
  });

  it('should add primitive', async () => {
    const manager = new ConfigManager(TEST_DIR);
    await manager.create();

    await manager.addPrimitive('planner', '1.0.0');
    const primitives = await manager.getPrimitives();

    expect(primitives).toContain('planner');
  });

  it('should remove primitive', async () => {
    const manager = new ConfigManager(TEST_DIR);
    await manager.create();
    await manager.addPrimitive('planner');

    await manager.removePrimitive('planner');
    const primitives = await manager.getPrimitives();

    expect(primitives).not.toContain('planner');
  });

  it('should check if primitive exists', async () => {
    const manager = new ConfigManager(TEST_DIR);
    await manager.create();
    await manager.addPrimitive('planner');

    expect(await manager.hasPrimitive('planner')).toBe(true);
    expect(await manager.hasPrimitive('memory')).toBe(false);
  });
});
