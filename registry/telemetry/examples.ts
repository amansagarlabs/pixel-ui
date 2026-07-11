import { createTelemetry } from './telemetry';

async function basicTelemetry() {
  const telemetry = createTelemetry();
  
  telemetry.track('api', 'request', { endpoint: '/chat' });
  telemetry.track('model', 'completion', { tokens: 150 });
  
  const events = telemetry.getEvents();
  console.log('Events:', events.length);
}

async function performanceTracking() {
  const telemetry = createTelemetry();
  
  const start = Date.now();
  // Do some work
  const duration = Date.now() - start;
  
  telemetry.track('performance', 'operation', { duration });
}

export { basicTelemetry, performanceTracking };
