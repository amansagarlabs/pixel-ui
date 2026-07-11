# Reflection Primitive

The reflection primitive provides self-reflection and improvement capabilities for AI agents.

## Installation

```bash
npx agentcn add reflection
```

## Usage

```typescript
import { createReflector } from './reflection';

const reflector = createReflector({
  maxIterations: 3,
  threshold: 0.8
});

// Reflect on an output
const reflection = await reflector.reflect(input, output);
console.log('Score:', reflection.score);
console.log('Suggestions:', reflection.suggestions);

// Get detailed critique
const suggestions = await reflector.critique(reflection);

// Improve based on suggestions
const improved = await reflector.improve(reflection, suggestions);
```

## API

### `createReflector(config?: ReflectionConfig)`

Creates a new reflector instance.

### `reflector.reflect(input, output)`

Reflects on the output and returns a reflection with score and suggestions.

### `reflector.critique(reflection)`

Generates detailed improvement suggestions.

### `reflector.improve(reflection, suggestions)`

Applies suggestions to improve the output.

## Configuration

```typescript
interface ReflectionConfig {
  maxIterations?: number;  // Max improvement iterations (default: 3)
  threshold?: number;      // Quality threshold (default: 0.8)
}
```
