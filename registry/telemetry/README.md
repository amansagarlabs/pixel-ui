# Telemetry Primitive

The telemetry primitive provides logging and monitoring capabilities for AI agents.

## Installation

```bash
npx agentcn add telemetry
```

## Usage

```typescript
import { createTelemetry } from './telemetry';

const telemetry = createTelemetry({
  enabled: true,
  bufferSize: 100,
  flushInterval: 5000
});

// Track events
telemetry.track('api', 'request', { url: '/chat', method: 'POST' });
telemetry.track('model', 'completion', { tokens: 150, latency: 1200 });

// Get events
const events = telemetry.getEvents();

// Flush events
await telemetry.flush();
```

## API

### `createTelemetry(config?)`

Creates a new telemetry instance.

### `telemetry.track(type, name, data?)`

Tracks a telemetry event.

### `telemetry.flush()`

Flushes buffered events.

### `telemetry.getEvents()`

Returns all tracked events.

### `telemetry.clear()`

Clears all events.

## Configuration

```typescript
interface TelemetryConfig {
  enabled?: boolean;       // Enable telemetry (default: true)
  bufferSize?: number;     // Buffer size before auto-flush (default: 100)
  flushInterval?: number;  // Auto-flush interval in ms (default: 5000)
}
```
