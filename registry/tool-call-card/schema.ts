import { z } from 'zod';

export const ToolCallStatusSchema = z.enum(['pending', 'running', 'success', 'error']);

export const ToolCallArgumentSchema = z.object({
  name: z.string().min(1),
  value: z.unknown(),
  sensitive: z.boolean().optional().default(false)
});

export const ToolCallResultSchema = z.object({
  output: z.unknown().optional(),
  summary: z.string().optional(),
  error: z.string().optional()
});

export const ToolCallCardPropsSchema = z.object({
  id: z.string().min(1),
  toolName: z.string().min(1),
  status: ToolCallStatusSchema,
  arguments: z.array(ToolCallArgumentSchema).optional().default([]),
  result: ToolCallResultSchema.optional(),
  startedAt: z.union([z.string(), z.date()]).optional(),
  completedAt: z.union([z.string(), z.date()]).optional(),
  requiresApproval: z.boolean().optional().default(false)
});

export const ToolCallStateSchema = z.object({
  id: z.string().min(1),
  toolName: z.string().min(1),
  status: ToolCallStatusSchema,
  arguments: z.array(ToolCallArgumentSchema),
  result: ToolCallResultSchema.optional(),
  startedAt: z.date(),
  completedAt: z.date().optional()
});

export type ToolCallStatusInput = z.infer<typeof ToolCallStatusSchema>;
export type ToolCallCardPropsInput = z.input<typeof ToolCallCardPropsSchema>;
export type ToolCallCardPropsOutput = z.output<typeof ToolCallCardPropsSchema>;
export type ToolCallStateOutput = z.output<typeof ToolCallStateSchema>;
