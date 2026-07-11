# Planner Primitive

The planner primitive provides task decomposition and planning capabilities for AI agents.

## Installation

```bash
npx agentcn add planner
```

## Usage

```typescript
import { createPlanner } from './planner';

const planner = createPlanner({
  maxSteps: 10,
  allowParallel: false,
  retryFailed: true
});

// Create a plan
const plan = await planner.createPlan('Build a website');

// Execute the plan
const result = await planner.executePlan(plan);
```

## API

### `createPlanner(config?: PlannerConfig)`

Creates a new planner instance.

### `planner.createPlan(goal: string)`

Creates a new plan with the given goal.

### `planner.executePlan(plan: Plan)`

Executes the plan and returns the updated plan.

### `planner.getNextStep(plan: Plan)`

Returns the next step to execute based on dependencies.

### `planner.updateStep(plan, stepId, status, result?)`

Updates the status of a step in the plan.

## Configuration

```typescript
interface PlannerConfig {
  maxSteps?: number;      // Maximum steps in a plan (default: 10)
  allowParallel?: boolean; // Allow parallel execution (default: false)
  retryFailed?: boolean;  // Retry failed steps (default: true)
}
```

## Examples

See [examples.ts](./examples.ts) for more usage examples.
