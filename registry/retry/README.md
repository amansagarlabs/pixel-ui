# Retry Primitive

The retry primitive provides retry logic with exponential backoff for AI agents.

## Installation

```bash
npx agentcn add retry
```

## Usage

```typescript
import { createRetryer } from './retry';

const retryer = createRetryer({
  maxRetries: 3,
  initialDelay: 1000,
  backoffMultiplier: 2
});

// Execute with retry
const result = await retryer.execute(async () => {
  return await fetch('https://api.example.com/data');
});

if (result.success) {
  console.log('Result:', result.result);
} else {
  console.error('Failed after', result.attempts, 'attempts');
}
```

## API

### `createRetryer(config?: RetryConfig)`

Creates a new retryer instance.

### `retryer.execute(fn)`

Executes the function with retry logic.

### `retryer.isRetryable(error)`

Checks if an error is retryable.

### `retryer.getDelay(attempt)`

Calculates the delay for a given attempt.

## Configuration

```typescript
interface RetryConfig {
  maxRetries?: number;        // Max retry attempts (default: 3)
  initialDelay?: number;      // Initial delay in ms (default: 1000)
  maxDelay?: number;          // Max delay in ms (default: 30000)
  backoffMultiplier?: number; // Backoff multiplier (default: 2)
  retryableErrors?: string[]; // Error codes to retry on
}
```
