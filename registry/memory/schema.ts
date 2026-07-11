import { z } from 'zod';

export const MemoryEntrySchema = z.object({
  id: z.string(),
  content: z.string(),
  type: z.enum(['short_term', 'long_term']),
  metadata: z.record(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().optional()
});

export const MemoryConfigSchema = z.object({
  maxShortTerm: z.number().optional().default(100),
  maxLongTerm: z.number().optional().default(1000),
  defaultTTL: z.number().optional().default(3600000) // 1 hour
});
