import { describe, it, expect } from 'vitest';
import { createRetryer } from './retry';

describe('createRetryer', () => {
  it('should create a retryer', () => {
    const retryer = createRetryer();
    expect(retryer).toBeDefined();
  });

  it('should execute successfully on first try', async () => {
    const retryer = createRetryer();
    const result = await retryer.execute(async () => 'success');
    
    expect(result.success).toBe(true);
    expect(result.result).toBe('success');
    expect(result.attempts).toBe(1);
  });

  it('should retry on failure', async () => {
    const retryer = createRetryer({ maxRetries: 2, initialDelay: 10 });
    let attempts = 0;
    
    const result = await retryer.execute(async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('ECONNRESET');
      }
      return 'success';
    });
    
    expect(result.success).toBe(true);
    expect(result.attempts).toBe(3);
  });

  it('should fail after max retries', async () => {
    const retryer = createRetryer({ maxRetries: 2, initialDelay: 10 });
    
    const result = await retryer.execute(async () => {
      throw new Error('ECONNRESET');
    });
    
    expect(result.success).toBe(false);
    expect(result.attempts).toBe(3);
  });

  it('should calculate delay with backoff', () => {
    const retryer = createRetryer({ initialDelay: 1000, backoffMultiplier: 2 });
    
    expect(retryer.getDelay(1)).toBe(1000);
    expect(retryer.getDelay(2)).toBe(2000);
    expect(retryer.getDelay(3)).toBe(4000);
  });
});
