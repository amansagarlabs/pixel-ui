import { describe, it, expect } from 'vitest';
import { createTelemetry } from './telemetry';

describe('createTelemetry', () => {
  it('should create telemetry', () => {
    const telemetry = createTelemetry();
    expect(telemetry).toBeDefined();
  });

  it('should track events', () => {
    const telemetry = createTelemetry();
    const event = telemetry.track('api', 'request', { url: '/test' });
    
    expect(event.id).toBeDefined();
    expect(event.type).toBe('api');
    expect(event.name).toBe('request');
  });

  it('should get events', () => {
    const telemetry = createTelemetry();
    telemetry.track('api', 'request1');
    telemetry.track('api', 'request2');
    
    const events = telemetry.getEvents();
    expect(events.length).toBe(2);
  });

  it('should clear events', () => {
    const telemetry = createTelemetry();
    telemetry.track('api', 'request');
    telemetry.clear();
    
    expect(telemetry.getEvents().length).toBe(0);
  });

  it('should flush events', async () => {
    const telemetry = createTelemetry();
    telemetry.track('api', 'request');
    await telemetry.flush();
    
    expect(telemetry.getEvents().length).toBe(0);
  });
});
