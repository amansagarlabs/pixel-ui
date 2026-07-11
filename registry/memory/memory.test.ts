import { describe, it, expect } from 'vitest';
import { createMemory } from './memory';

describe('createMemory', () => {
  it('should create a memory with default config', () => {
    const memory = createMemory();
    expect(memory).toBeDefined();
  });

  it('should store and retrieve short-term entries', () => {
    const memory = createMemory();
    const entry = memory.store('Hello world', 'short_term');
    
    expect(entry.id).toBeDefined();
    expect(entry.content).toBe('Hello world');
    expect(entry.type).toBe('short_term');
    expect(entry.expiresAt).toBeDefined();
  });

  it('should store and retrieve long-term entries', () => {
    const memory = createMemory();
    const entry = memory.store('Important information', 'long_term', { source: 'user' });
    
    expect(entry.id).toBeDefined();
    expect(entry.content).toBe('Important information');
    expect(entry.type).toBe('long_term');
    expect(entry.metadata.source).toBe('user');
    expect(entry.expiresAt).toBeUndefined();
  });

  it('should retrieve entries by id', () => {
    const memory = createMemory();
    const entry = memory.store('Test content', 'short_term');
    
    const retrieved = memory.retrieve(entry.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.content).toBe('Test content');
  });

  it('should return undefined for non-existent id', () => {
    const memory = createMemory();
    const retrieved = memory.retrieve('non-existent');
    expect(retrieved).toBeUndefined();
  });

  it('should search entries by content', () => {
    const memory = createMemory();
    memory.store('Hello world', 'short_term');
    memory.store('Goodbye world', 'long_term');
    memory.store('Something else', 'short_term');
    
    const results = memory.search('world');
    expect(results.length).toBe(2);
  });

  it('should search entries by metadata', () => {
    const memory = createMemory();
    memory.store('Content 1', 'short_term', { category: 'important' });
    memory.store('Content 2', 'short_term', { category: 'other' });
    
    const results = memory.search('important');
    expect(results.length).toBe(1);
    expect(results[0].content).toBe('Content 1');
  });

  it('should delete entries', () => {
    const memory = createMemory();
    const entry = memory.store('To be deleted', 'short_term');
    
    expect(memory.delete(entry.id)).toBe(true);
    expect(memory.retrieve(entry.id)).toBeUndefined();
  });

  it('should clear all entries', () => {
    const memory = createMemory();
    memory.store('Entry 1', 'short_term');
    memory.store('Entry 2', 'long_term');
    
    memory.clear();
    
    const stats = memory.getStats();
    expect(stats.shortTerm).toBe(0);
    expect(stats.longTerm).toBe(0);
  });

  it('should clear only short-term entries', () => {
    const memory = createMemory();
    memory.store('Short term', 'short_term');
    memory.store('Long term', 'long_term');
    
    memory.clear('short_term');
    
    const stats = memory.getStats();
    expect(stats.shortTerm).toBe(0);
    expect(stats.longTerm).toBe(1);
  });

  it('should return correct stats', () => {
    const memory = createMemory();
    memory.store('Entry 1', 'short_term');
    memory.store('Entry 2', 'short_term');
    memory.store('Entry 3', 'long_term');
    
    const stats = memory.getStats();
    expect(stats.shortTerm).toBe(2);
    expect(stats.longTerm).toBe(1);
  });
});
