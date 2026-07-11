import { z } from 'zod';

export const RetryConfigSchema = z.object({
  maxRetries: z.number().optional().default(3),
  initialDelay: z.number().optional().default(1000),
  maxDelay: z.number().optional().default(30000),
  backoffMultiplier: z.number().optional().default(2),
  retryableErrors: z.array(z.string()).optional().default(['ECONNRESET', 'ETIMEDOUT', '500', '502', '503'])
});
