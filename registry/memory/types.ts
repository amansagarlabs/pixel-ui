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
