import { z } from 'zod';

export const TelemetryEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  data: z.record(z.unknown()),
  timestamp: z.date(),
  duration: z.number().optional()
});

export const TelemetryConfigSchema = z.object({
  enabled: z.boolean().optional().default(true),
  bufferSize: z.number().optional().default(100),
  flushInterval: z.number().optional().default(5000)
});
