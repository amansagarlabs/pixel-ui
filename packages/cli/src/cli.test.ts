import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

const CLI_PATH = path.join(__dirname, '../src/cli.ts');

describe('CLI', () => {
  it('should show version', () => {
    const output = execSync(`npx tsx ${CLI_PATH} --version`, {
      encoding: 'utf-8'
    });
    expect(output.trim()).toBe('0.1.0');
  });

  it('should show help', () => {
    const output = execSync(`npx tsx ${CLI_PATH} --help`, {
      encoding: 'utf-8'
    });
    expect(output).toContain('pixel-ui');
    expect(output).toContain('init');
    expect(output).toContain('add');
    expect(output).toContain('remove');
    expect(output).toContain('list');
    expect(output).toContain('doctor');
    expect(output).toContain('test');
    expect(output).toContain('upgrade');
  });

  it('should show init command help', () => {
    const output = execSync(`npx tsx ${CLI_PATH} init --help`, {
      encoding: 'utf-8'
    });
    expect(output).toContain('Initialize');
  });

  it('should show add command help', () => {
    const output = execSync(`npx tsx ${CLI_PATH} add --help`, {
      encoding: 'utf-8'
    });
    expect(output).toContain('Add a primitive');
  });
});
