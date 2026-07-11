import { z } from 'zod';

export const ReflectionSchema = z.object({
  id: z.string(),
  input: z.unknown(),
  output: z.unknown(),
  critique: z.string(),
  score: z.number().min(0).max(1),
  suggestions: z.array(z.string()),
  timestamp: z.date()
});

export const ReflectionConfigSchema = z.object({
  maxIterations: z.number().optional().default(3),
  threshold: z.number().optional().default(0.8)
});
