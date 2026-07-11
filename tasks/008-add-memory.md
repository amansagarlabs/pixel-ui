# Task 008: Add Memory Primitive

## Objective

Create the memory primitive for short-term and long-term memory storage.

---

## Acceptance Criteria

- [ ] Create memory directory structure
- [ ] Implement core memory logic
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
registry/memory/
├── registry.json
├── index.ts
├── memory.ts
├── types.ts
├── schema.ts
├── prompt.md
├── README.md
├── examples.ts
├── memory.test.ts
├── memory.eval.ts
└── CHANGELOG.md
```

### Types

```typescript
export interface MemoryEntry {
  id: string;
  content: string;
  type: 'short_term' | 'long_term';
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface MemoryConfig {
  maxShortTerm?: number;
  maxLongTerm?: number;
  defaultTTL?: number;
}

export interface Memory {
  store(content: string, type: MemoryEntry['type'], metadata?: Record<string, unknown>): MemoryEntry;
  retrieve(id: string): MemoryEntry | undefined;
  search(query: string): MemoryEntry[];
  delete(id: string): boolean;
  clear(type?: MemoryEntry['type']): void;
  getStats(): { shortTerm: number; longTerm: number };
}
```

### Implementation

```typescript
export function createMemory(config: MemoryConfig = {}): Memory {
  const shortTerm: Map<string, MemoryEntry> = new Map();
  const longTerm: Map<string, MemoryEntry> = new Map();

  return {
    store(content: string, type: MemoryEntry['type'], metadata = {}): MemoryEntry {
      const entry: MemoryEntry = {
        id: randomUUID(),
        content,
        type,
        metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: type === 'short_term' ? new Date(Date.now() + config.defaultTTL) : undefined
      };

      const store = type === 'short_term' ? shortTerm : longTerm;
      store.set(entry.id, entry);
      return entry;
    },

    retrieve(id: string): MemoryEntry | undefined {
      const entry = shortTerm.get(id) || longTerm.get(id);
      if (entry?.expiresAt && entry.expiresAt < new Date()) {
        shortTerm.delete(id);
        return undefined;
      }
      return entry;
    },

    search(query: string): MemoryEntry[] {
      const all = [...shortTerm.values(), ...longTerm.values()];
      return all.filter(e => e.content.toLowerCase().includes(query.toLowerCase()));
    },

    delete(id: string): boolean {
      return shortTerm.delete(id) || longTerm.delete(id);
    },

    clear(type?: MemoryEntry['type']): void {
      if (type === 'short_term' || !type) shortTerm.clear();
      if (type === 'long_term' || !type) longTerm.clear();
    },

    getStats() {
      return { shortTerm: shortTerm.size, longTerm: longTerm.size };
    }
  };
}
```

---

## Testing

- [ ] Stores entries correctly
- [ ] Retrieves entries correctly
- [ ] Searches entries correctly
- [ ] Handles expiration
- [ ] Clears memory correctly

---

## Definition of Done

- [ ] All files created
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Added to registry

---

## References

- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
