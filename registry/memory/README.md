# Memory Primitive

The memory primitive provides short-term and long-term memory storage for AI agents.

## Installation

```bash
npx agentcn add memory
```

## Usage

```typescript
import { createMemory } from './memory';

const memory = createMemory({
  maxShortTerm: 100,
  maxLongTerm: 1000,
  defaultTTL: 3600000 // 1 hour
});

// Store a short-term memory
const entry = memory.store('User asked about weather', 'short_term');

// Store a long-term memory
memory.store('User prefers Celsius', 'long_term', { source: 'conversation' });

// Retrieve by id
const retrieved = memory.retrieve(entry.id);

// Search memories
const results = memory.search('weather');

// Get stats
const stats = memory.getStats();
console.log(stats); // { shortTerm: 1, longTerm: 1 }
```

## API

### `createMemory(config?: MemoryConfig)`

Creates a new memory instance.

### `memory.store(content, type, metadata?)`

Stores a new memory entry.

### `memory.retrieve(id)`

Retrieves a memory entry by id.

### `memory.search(query)`

Searches memory entries by content or metadata.

### `memory.delete(id)`

Deletes a memory entry.

### `memory.clear(type?)`

Clears memory entries. If type is specified, only clears that type.

### `memory.getStats()`

Returns statistics about stored memories.

## Configuration

```typescript
interface MemoryConfig {
  maxShortTerm?: number;  // Max short-term entries (default: 100)
  maxLongTerm?: number;   // Max long-term entries (default: 1000)
  defaultTTL?: number;    // Default TTL in ms (default: 3600000)
}
```

## Examples

See [examples.ts](./examples.ts) for more usage examples.
