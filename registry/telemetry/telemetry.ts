import { randomUUID } from 'crypto';
import { TelemetryEventSchema, TelemetryConfigSchema } from './schema';
import type { TelemetryEvent, TelemetryConfig, Telemetry } from './types';

export function createTelemetry(config: TelemetryConfig = {}): Telemetry {
  const validatedConfig = TelemetryConfigSchema.parse(config);
  const events: TelemetryEvent[] = [];
  let flushTimer: ReturnType<typeof setInterval> | undefined;

  if (validatedConfig.enabled && validatedConfig.flushInterval > 0) {
    flushTimer = setInterval(() => {
      // Auto-flush would happen here
    }, validatedConfig.flushInterval);
  }

  return {
    track(type: string, name: string, data: Record<string, unknown> = {}): TelemetryEvent {
      const event = TelemetryEventSchema.parse({
        id: randomUUID(),
        type,
        name,
        data,
        timestamp: new Date()
      });

      if (validatedConfig.enabled) {
        events.push(event);
        
        if (events.length >= validatedConfig.bufferSize) {
          this.flush();
        }
      }

      return event;
    },

    async flush(): Promise<void> {
      // In production, this would send events to a telemetry service
      events.length = 0;
    },

    getEvents(): TelemetryEvent[] {
      return [...events];
    },

    clear(): void {
      events.length = 0;
    }
  };
}
