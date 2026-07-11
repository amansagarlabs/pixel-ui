# Router Primitive

The router primitive provides multi-model routing capabilities for AI agents.

## Installation

```bash
npx agentcn add router
```

## Usage

```typescript
import { createRouter } from './router';

const router = createRouter({
  models: [
    { id: 'gpt4', name: 'GPT-4', provider: 'openai', priority: 1, weight: 0.8, maxTokens: 8192, costPer1kTokens: 0.03 },
    { id: 'gpt35', name: 'GPT-3.5', provider: 'openai', priority: 2, weight: 0.5, maxTokens: 4096, costPer1kTokens: 0.002 }
  ],
  strategy: 'priority'
});

// Route a request
const response = await router.route({
  task: 'Summarize this document',
  complexity: 'medium',
  requirements: ['fast']
});

console.log('Selected model:', response.model.name);
```

## API

### `createRouter(config)`

Creates a new router instance.

### `router.route(request)`

Routes a request to the best model.

### `router.getModels()`

Returns all available models.

### `router.addModel(model)`

Adds a new model.

### `router.removeModel(modelId)`

Removes a model.

## Configuration

```typescript
interface RouterConfig {
  models: ModelConfig[];
  strategy?: 'priority' | 'round-robin' | 'cost' | 'capability';
}
```
