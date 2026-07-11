import { randomUUID } from 'crypto';
import { ContextConfigSchema } from './schema';
import type { ContextItem, ContextConfig, ContextManager } from './types';

function estimateTokens(text: string): number {
  // Rough estimate: 1 token per 4 characters
  return Math.ceil(text.length / 4);
}

export function createContextManager(config: ContextConfig = {}): ContextManager {
  const validatedConfig = ContextConfigSchema.parse(config);
  const items: Map<string, ContextItem> = new Map();

  return {
    addItem(item: Omit<ContextItem, 'id' | 'tokenCount'>): ContextItem {
      const newItem: ContextItem = {
        id: randomUUID(),
        ...item,
        tokenCount: estimateTokens(item.content)
      };
      items.set(newItem.id, newItem);
      return newItem;
    },

    removeItem(id: string): boolean {
      return items.delete(id);
    },

    getItems(): ContextItem[] {
      return Array.from(items.values());
    },

    compress(): ContextItem[] {
      const allItems = Array.from(items.values());
      const totalTokens = allItems.reduce((sum, item) => sum + item.tokenCount, 0);

      if (totalTokens <= validatedConfig.maxTokens) {
        return allItems;
      }

      // Sort by priority and keep items that fit
      const sorted = allItems.sort((a, b) => b.priority - a.priority);
      const result: ContextItem[] = [];
      let currentTokens = 0;

      for (const item of sorted) {
        if (currentTokens + item.tokenCount <= validatedConfig.maxTokens) {
          result.push(item);
          currentTokens += item.tokenCount;
        }
      }

      return result;
    },

    getTokenCount(): number {
      return Array.from(items.values()).reduce((sum, item) => sum + item.tokenCount, 0);
    },

    fitToWindow(maxTokens: number): ContextItem[] {
      const allItems = Array.from(items.values());
      const sorted = allItems.sort((a, b) => b.priority - a.priority);
      const result: ContextItem[] = [];
      let currentTokens = 0;

      for (const item of sorted) {
        if (currentTokens + item.tokenCount <= maxTokens) {
          result.push(item);
          currentTokens += item.tokenCount;
        }
      }

      return result;
    }
  };
}
