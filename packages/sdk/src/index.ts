import { z } from 'zod';

// Re-export all primitives
export { createPlanner } from '../../registry/planner';
export type { Plan, PlanStep, PlannerConfig, Planner } from '../../registry/planner';

export { createMemory } from '../../registry/memory';
export type { MemoryEntry, MemoryConfig, Memory } from '../../registry/memory';

export { createBrowser } from '../../registry/browser';
export type { BrowserConfig, Page, Link, Form, FormField, Browser } from '../../registry/browser';

export { createEvaluator } from '../../registry/evaluator';
export type { EvaluationCriteria, EvaluationResult, Evaluation, EvaluatorConfig, Evaluator } from '../../registry/evaluator';

export { createReflector } from '../../registry/reflection';
export type { Reflection, ReflectionConfig, Reflector } from '../../registry/reflection';

export { createRetryer } from '../../registry/retry';
export type { RetryConfig, RetryResult, Retryer } from '../../registry/retry';

export { createApprover } from '../../registry/approval';
export type { ApprovalRequest, ApprovalResponse, ApprovalConfig, Approver } from '../../registry/approval';

export { createRouter } from '../../registry/router';
export type { ModelConfig, RouteRequest, RouteResponse, RouterConfig, Router } from '../../registry/router';

export { createTelemetry } from '../../registry/telemetry';
export type { TelemetryEvent, TelemetryConfig, Telemetry } from '../../registry/telemetry';

export { createSecurityGuard } from '../../registry/security';
export type { SecurityRule, SecurityConfig, SecurityCheck, SecurityGuard } from '../../registry/security';

export { createContextManager } from '../../registry/context';
export type { ContextItem, ContextConfig, ContextManager } from '../../registry/context';

// Agent configuration
export interface AgentConfig {
  planner?: Parameters<typeof createPlanner>[0];
  memory?: Parameters<typeof createMemory>[0];
  evaluator?: Parameters<typeof createEvaluator>[0];
  security?: Parameters<typeof createSecurityGuard>[0];
  context?: Parameters<typeof createContextManager>[0];
  telemetry?: Parameters<typeof createTelemetry>[0];
}

// Create a configured agent
export function createAgent(config: AgentConfig = {}) {
  const planner = createPlanner(config.planner);
  const memory = createMemory(config.memory);
  const evaluator = createEvaluator(config.evaluator);
  const telemetry = createTelemetry(config.telemetry);
  const context = createContextManager(config.context);

  return {
    planner,
    memory,
    evaluator,
    telemetry,
    context,
    async execute(goal: string) {
      telemetry.track('agent', 'execute', { goal });
      const plan = await planner.createPlan(goal);
      const result = await planner.executePlan(plan);
      telemetry.track('agent', 'complete', { status: result.status });
      return result;
    }
  };
}
