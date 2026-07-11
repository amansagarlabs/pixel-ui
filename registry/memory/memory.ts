import { randomUUID } from 'crypto';
import { MemoryEntrySchema, MemoryConfigSchema } from './schema';
import type { MemoryEntry, MemoryConfig, Memory } from './types';

export function createMemory(config: MemoryConfig = {}): Memory {
  const validatedConfig = MemoryConfigSchema.parse(config);
  const shortTerm: Map<string, MemoryEntry> = new Map();
  const longTerm: Map<string, MemoryEntry> = new Map();

  function evictOldEntries(store: Map<string, MemoryEntry>, maxSize: number) {
    if (store.size > maxSize) {
      const oldest = Array.from(store.entries())
        .sort((a, b) => a[1].createdAt.getTime() - b[1].createdAt.getTime())
        .slice(0, store.size - maxSize);
      
      for (const [id] of oldest) {
        store.delete(id);
      }
    }
  }

  return {
    store(content: string, type: MemoryEntry['type'], metadata: Record<string, unknown> = {}): MemoryEntry {
      const entry: MemoryEntry = {
        id: randomUUID(),
        content,
        type,
        metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: type === 'short_term' 
          ? new Date(Date.now() + validatedConfig.defaultTTL)
          : undefined
      };

      const validated = MemoryEntrySchema.parse(entry);
      const store = type === 'short_term' ? shortTerm : longTerm;
      
      store.set(validated.id, validated);
      evictOldEntries(store, type === 'short_term' ? validatedConfig.maxShortTerm : validatedConfig.maxLongTerm);
      
      return validated;
    },

    retrieve(id: string): MemoryEntry | undefined {
      const entry = shortTerm.get(id) || longTerm.get(id);
      if (!entry) return undefined;

      if (entry.expiresAt && entry.expiresAt < new Date()) {
        shortTerm.delete(id);
        return undefined;
      }

      return entry;
    },

    search(query: string): MemoryEntry[] {
      const allEntries = [...shortTerm.values(), ...longTerm.values()];
      const lowerQuery = query.toLowerCase();
      
      return allEntries.filter(entry => 
        entry.content.toLowerCase().includes(lowerQuery) ||
        Object.values(entry.metadata).some(v => 
          String(v).toLowerCase().includes(lowerQuery)
        )
      );
    },

    delete(id: string): boolean {
      return shortTerm.delete(id) || longTerm.delete(id);
    },

    clear(type?: MemoryEntry['type']): void {
      if (type === 'short_term' || !type) shortTerm.clear();
      if (type === 'long_term' || !type) longTerm.clear();
    },

    getStats() {
      return {
        shortTerm: shortTerm.size,
        longTerm: longTerm.size
      };
    }
  };
}
