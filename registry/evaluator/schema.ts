import { z } from 'zod';

export const EvaluationCriteriaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  weight: z.number().min(0).max(1),
  scoreRange: z.tuple([z.number(), z.number()])
});

export const EvaluationResultSchema = z.object({
  criteriaId: z.string(),
  score: z.number(),
  feedback: z.string()
});

export const EvaluationSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  targetType: z.string(),
  criteria: z.array(EvaluationCriteriaSchema),
  results: z.array(EvaluationResultSchema),
  overallScore: z.number(),
  createdAt: z.date()
});

export const EvaluatorConfigSchema = z.object({
  criteria: z.array(EvaluationCriteriaSchema).optional(),
  threshold: z.number().optional().default(0.7)
});
