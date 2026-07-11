# Task 010: Add Evaluator Primitive

## Objective

Create the evaluator primitive for output evaluation and scoring.

---

## Acceptance Criteria

- [ ] Create evaluator directory structure
- [ ] Implement core evaluator logic
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
registry/evaluator/
├── registry.json
├── index.ts
├── evaluator.ts
├── types.ts
├── schema.ts
├── prompt.md
├── README.md
├── examples.ts
├── evaluator.test.ts
├── evaluator.eval.ts
└── CHANGELOG.md
```

### Types

```typescript
export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  scoreRange: [number, number];
}

export interface EvaluationResult {
  criteriaId: string;
  score: number;
  feedback: string;
}

export interface Evaluation {
  id: string;
  targetId: string;
  targetType: string;
  criteria: EvaluationCriteria[];
  results: EvaluationResult[];
  overallScore: number;
  createdAt: Date;
}

export interface EvaluatorConfig {
  criteria?: EvaluationCriteria[];
  threshold?: number;
}

export interface Evaluator {
  evaluate(target: unknown, targetType: string): Promise<Evaluation>;
  addCriteria(criteria: EvaluationCriteria): void;
  removeCriteria(criteriaId: string): void;
  getCriteria(): EvaluationCriteria[];
}
```

### Implementation

```typescript
export function createEvaluator(config: EvaluatorConfig = {}): Evaluator {
  const criteria: Map<string, EvaluationCriteria> = new Map();

  return {
    async evaluate(target: unknown, targetType: string): Promise<Evaluation> {
      const results = Array.from(criteria.values()).map(c => ({
        criteriaId: c.id,
        score: calculateScore(target, c),
        feedback: generateFeedback(target, c)
      }));

      const overallScore = calculateOverallScore(results, criteria);

      return {
        id: randomUUID(),
        targetId: String(target),
        targetType,
        criteria: Array.from(criteria.values()),
        results,
        overallScore,
        createdAt: new Date()
      };
    },

    addCriteria(criterion: EvaluationCriteria): void {
      criteria.set(criterion.id, criterion);
    },

    removeCriteria(criteriaId: string): void {
      criteria.delete(criteriaId);
    },

    getCriteria(): EvaluationCriteria[] {
      return Array.from(criteria.values());
    }
  };
}
```

---

## Testing

- [ ] Creates evaluation correctly
- [ ] Calculates scores correctly
- [ ] Generates feedback
- [ ] Manages criteria
- [ ] Handles edge cases

---

## Definition of Done

- [ ] All files created
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Added to registry

---

## References

- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
