import { componentRegistry } from "@/lib/component-registry"

const primitiveBackedComponents: Record<string, string> = {
  "agent-canvas-node": "context",
  "agent-status-pill": "context",
  "approval-gate": "approval",
  "context-inspector": "context",
  "guardrail-confirm": "approval",
  "memory-recall": "memory",
  "planner-steps": "planner",
  "reasoning-stream": "reflection",
  "retry-boundary": "retry",
  "run-terminal": "tool-call-card",
  "streaming-bubble": "context",
  "trace-timeline": "reflection",
  "tool-call-card": "tool-call-card",
}

export const componentsBySlug: Record<string, string> = Object.fromEntries(
  componentRegistry.map((item) => [item.slug, primitiveBackedComponents[item.slug] ?? item.slug])
)

export const componentSlugs = Object.keys(componentsBySlug)

