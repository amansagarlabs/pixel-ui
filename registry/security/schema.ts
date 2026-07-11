import { z } from 'zod';

export const SecurityRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['input', 'output', 'action']),
  pattern: z.union([z.string(), z.instanceof(RegExp)]),
  action: z.enum(['block', 'warn', 'log']),
  message: z.string()
});

export const SecurityConfigSchema = z.object({
  rules: z.array(SecurityRuleSchema),
  enabled: z.boolean().optional().default(true),
  logViolations: z.boolean().optional().default(true)
});
