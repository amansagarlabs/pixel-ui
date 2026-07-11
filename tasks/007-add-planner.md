# Task 007: Add Planner Primitive

## Objective

Create the planner primitive for task decomposition and planning.

---

## Acceptance Criteria

- [ ] Create planner directory structure
- [ ] Implement core planner logic
- [ ] Define TypeScript types
- [ ] Add Zod schemas
- [ ] Write system prompt
- [ ] Create documentation
- [ ] Add usage examples
- [ ] Write unit tests
- [ ] Write evaluation tests
- [ ] Add to registry

---

## Technical Details

### Directory Structure

```
registry/planner/
├── registry.json
├── index.ts
├── planner.ts
├── types.ts
├── schema.ts
├── prompt.md
├── README.md
├── examples.ts
├── planner.test.ts
├── planner.eval.ts
└── CHANGELOG.md
```

### Types

```typescript
export interface PlanStep {
  id: string;
  description: string;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: unknown;
}

export interface Plan {
  id: string;
  goal: string;
  steps: PlanStep[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannerConfig {
  maxSteps?: number;
  allowParallel?: boolean;
  retryFailed?: boolean;
}
```

### Implementation

```typescript
export function createPlanner(config: PlannerConfig = {}): Planner {
  return {
    async createPlan(goal: string): Promise<Plan> {
      // Create plan with unique ID
      // Initialize empty steps
      // Return plan
    },

    async executePlan(plan: Plan): Promise<Plan> {
      // Get next step
      // Execute step
      // Update status
      // Repeat until complete
    },

    getNextStep(plan: Plan): PlanStep | undefined {
      // Find step with no pending dependencies
    },

    updateStep(plan: Plan, stepId: string, status: PlanStep['status'], result?: unknown): Plan {
      // Update step status
      // Update plan timestamp
    }
  };
}
```

### Registry Metadata

```json
{
  "name": "planner",
  "category": "runtime",
  "version": "1.0.0",
  "description": "Task decomposition and planning",
  "files": ["index.ts", "planner.ts", "types.ts", "schema.ts", "prompt.md", "README.md", "examples.ts", "planner.test.ts", "planner.eval.ts"],
  "dependencies": ["zod"],
  "tags": ["planning", "tasks", "decomposition"]
}
```

---

## Testing

- [ ] Creates plan correctly
- [ ] Executes plan correctly
- [ ] Handles dependencies
- [ ] Handles failures
- [ ] Validates input

---

## Definition of Done

- [ ] All files created
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Added to registry

---

## References

- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
- [TRD.md](../docs/TRD.md)
