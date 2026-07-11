import { describe, it, expect } from 'vitest';
import { createReflector } from './reflection';

describe('createReflector', () => {
  it('should create a reflector', () => {
    const reflector = createReflector();
    expect(reflector).toBeDefined();
  });

  it('should reflect on input/output', async () => {
    const reflector = createReflector();
    const reflection = await reflector.reflect('input', 'output');
    
    expect(reflection.id).toBeDefined();
    expect(reflection.critique).toBeDefined();
    expect(reflection.score).toBeGreaterThanOrEqual(0);
    expect(reflection.score).toBeLessThanOrEqual(1);
  });

  it('should generate suggestions', async () => {
    const reflector = createReflector();
    const reflection = await reflector.reflect('input', 'output');
    const suggestions = await reflector.critique(reflection);
    
    expect(suggestions).toBeInstanceOf(Array);
  });
});
