export interface RetryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryableErrors?: string[];
}

export interface RetryResult<T> {
  success: boolean;
  result?: T;
  error?: Error;
  attempts: number;
}

export interface Retryer {
  execute<T>(fn: () => Promise<T>): Promise<RetryResult<T>>;
  isRetryable(error: Error): boolean;
  getDelay(attempt: number): number;
}
