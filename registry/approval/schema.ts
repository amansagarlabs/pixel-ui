import { z } from 'zod';

export const ApprovalRequestSchema = z.object({
  id: z.string(),
  action: z.string(),
  description: z.string(),
  metadata: z.record(z.unknown()),
  timestamp: z.date()
});

export const ApprovalResponseSchema = z.object({
  requestId: z.string(),
  approved: z.boolean(),
  reason: z.string().optional(),
  timestamp: z.date()
});

export const ApprovalConfigSchema = z.object({
  timeout: z.number().optional().default(300000), // 5 minutes
  defaultApproval: z.boolean().optional().default(false)
});
