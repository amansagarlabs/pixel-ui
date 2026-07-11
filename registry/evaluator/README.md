# Evaluator Primitive

The evaluator primitive provides output evaluation and scoring capabilities for AI agents.

## Installation

```bash
npx agentcn add evaluator
```

## Usage

```typescript
import { createEvaluator } from './evaluator';

const evaluator = createEvaluator({
  criteria: [
    {
      id: 'accuracy',
      name: 'Accuracy',
      description: 'How accurate is the output',
      weight: 0.5,
      scoreRange: [0, 1]
    },
    {
      id: 'completeness',
      name: 'Completeness',
      description: 'How complete is the output',
      weight: 0.5,
      scoreRange: [0, 1]
    }
  ],
  threshold: 0.7
});

// Evaluate some output
const evaluation = await evaluator.evaluate('Hello world', 'text');

console.log('Overall score:', evaluation.overallScore);
console.log('Results:', evaluation.results);
```

## API

### `createEvaluator(config?: EvaluatorConfig)`

Creates a new evaluator instance.

### `evaluator.evaluate(target, targetType)`

Evaluates the target against all criteria.

### `evaluator.addCriteria(criteria)`

Adds a new evaluation criteria.

### `evaluator.removeCriteria(criteriaId)`

Removes an evaluation criteria.

### `evaluator.getCriteria()`

Returns all evaluation criteria.

## Configuration

```typescript
interface EvaluatorConfig {
  criteria?: EvaluationCriteria[];  // Initial criteria
  threshold?: number;               // Passing threshold (default: 0.7)
}

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;        // 0-1, how much this criteria contributes
  scoreRange: [number, number];  // Min and max scores
}
```

## Examples

See [examples.ts](./examples.ts) for more usage examples.
