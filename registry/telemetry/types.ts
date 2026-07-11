export interface TelemetryEvent {
  id: string;
  type: string;
  name: string;
  data: Record<string, unknown>;
  timestamp: Date;
  duration?: number;
}

export interface TelemetryConfig {
  enabled?: boolean;
  bufferSize?: number;
  flushInterval?: number;
}

export interface Telemetry {
  track(type: string, name: string, data?: Record<string, unknown>): TelemetryEvent;
  flush(): Promise<void>;
  getEvents(): TelemetryEvent[];
  clear(): void;
}
