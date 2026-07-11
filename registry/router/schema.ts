import { z } from 'zod';

export const ModelConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  priority: z.number(),
  weight: z.number().min(0).max(1),
  maxTokens: z.number(),
  costPer1kTokens: z.number()
});

export const RouteRequestSchema = z.object({
  task: z.string(),
  complexity: z.enum(['low', 'medium', 'high']),
  requirements: z.array(z.string())
});

export const RouterConfigSchema = z.object({
  models: z.array(ModelConfigSchema),
  strategy: z.enum(['priority', 'round-robin', 'cost', 'capability']).optional().default('priority')
});
