import { z } from 'zod';

export const PlanStepSchema = z.object({
  id: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  result: z.unknown().optional()
});

export const PlanSchema = z.object({
  id: z.string(),
  goal: z.string(),
  steps: z.array(PlanStepSchema),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const PlannerConfigSchema = z.object({
  maxSteps: z.number().optional().default(10),
  allowParallel: z.boolean().optional().default(false),
  retryFailed: z.boolean().optional().default(true)
});
