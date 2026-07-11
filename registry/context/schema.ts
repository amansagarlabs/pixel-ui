import { z } from 'zod';

export const ContextItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  priority: z.number(),
  tokenCount: z.number(),
  metadata: z.record(z.unknown())
});

export const ContextConfigSchema = z.object({
  maxTokens: z.number().optional().default(4000),
  compressionRatio: z.number().optional().default(0.5),
  strategy: z.enum(['priority', 'recency', 'relevance']).optional().default('priority')
});
