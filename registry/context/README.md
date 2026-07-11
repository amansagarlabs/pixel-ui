# Context Primitive

The context primitive provides context window optimization for AI agents.

## Installation

```bash
npx agentcn add context
```

## Usage

```typescript
import { createContextManager } from './context';

const manager = createContextManager({
  maxTokens: 4000,
  strategy: 'priority'
});

// Add context items
manager.addItem({ content: 'Important context', priority: 10, metadata: {} });
manager.addItem({ content: 'Less important', priority: 1, metadata: {} });

// Compress to fit token limit
const compressed = manager.compress();

// Fit to specific window
const fitted = manager.fitToWindow(2000);
```

## API

### `createContextManager(config?)`

Creates a new context manager.

### `manager.addItem(item)`

Adds a context item.

### `manager.removeItem(id)`

Removes a context item.

### `manager.getItems()`

Returns all context items.

### `manager.compress()`

Compresses items to fit within token limit.

### `manager.getTokenCount()`

Returns total token count.

### `manager.fitToWindow(maxTokens)`

Fits items to a specific token window.
