import { RetryConfigSchema } from './schema';
import type { RetryConfig, RetryResult, Retryer } from './types';

export function createRetryer(config: RetryConfig = {}): Retryer {
  const validatedConfig = RetryConfigSchema.parse(config);

  return {
    async execute<T>(fn: () => Promise<T>): Promise<RetryResult<T>> {
      let lastError: Error | undefined;
      let attempt = 0;

      while (attempt <= validatedConfig.maxRetries) {
        try {
          const result = await fn();
          return { success: true, result, attempts: attempt + 1 };
        } catch (error) {
          lastError = error as Error;
          attempt++;

          if (attempt <= validatedConfig.maxRetries && this.isRetryable(lastError)) {
            const delay = this.getDelay(attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }

      return { success: false, error: lastError, attempts: attempt };
    },

    isRetryable(error: Error): boolean {
      const errorCode = error.message || '';
      return validatedConfig.retryableErrors.some(retryable => 
        errorCode.includes(retryable)
      );
    },

    getDelay(attempt: number): number {
      const delay = validatedConfig.initialDelay * Math.pow(validatedConfig.backoffMultiplier, attempt - 1);
      return Math.min(delay, validatedConfig.maxDelay);
    }
  };
}
