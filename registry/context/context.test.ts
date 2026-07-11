import { describe, it, expect } from 'vitest';
import { createContextManager } from './context';

describe('createContextManager', () => {
  it('should create a context manager', () => {
    const manager = createContextManager();
    expect(manager).toBeDefined();
  });

  it('should add items', () => {
    const manager = createContextManager();
    const item = manager.addItem({ content: 'Hello world', priority: 1, metadata: {} });
    
    expect(item.id).toBeDefined();
    expect(item.tokenCount).toBeGreaterThan(0);
  });

  it('should get items', () => {
    const manager = createContextManager();
    manager.addItem({ content: 'Item 1', priority: 1, metadata: {} });
    manager.addItem({ content: 'Item 2', priority: 2, metadata: {} });
    
    expect(manager.getItems().length).toBe(2);
  });

  it('should remove items', () => {
    const manager = createContextManager();
    const item = manager.addItem({ content: 'To remove', priority: 1, metadata: {} });
    manager.removeItem(item.id);
    
    expect(manager.getItems().length).toBe(0);
  });

  it('should calculate token count', () => {
    const manager = createContextManager();
    manager.addItem({ content: 'Hello world', priority: 1, metadata: {} });
    
    expect(manager.getTokenCount()).toBeGreaterThan(0);
  });

  it('should fit to window', () => {
    const manager = createContextManager({ maxTokens: 100 });
    manager.addItem({ content: 'Short', priority: 1, metadata: {} });
    manager.addItem({ content: 'A'.repeat(200), priority: 2, metadata: {} });
    
    const fitted = manager.fitToWindow(50);
    expect(fitted.length).toBe(1);
  });
});
