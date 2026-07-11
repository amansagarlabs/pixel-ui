export interface ContextItem {
  id: string;
  content: string;
  priority: number;
  tokenCount: number;
  metadata: Record<string, unknown>;
}

export interface ContextConfig {
  maxTokens?: number;
  compressionRatio?: number;
  strategy?: 'priority' | 'recency' | 'relevance';
}

export interface ContextManager {
  addItem(item: Omit<ContextItem, 'id' | 'tokenCount'>): ContextItem;
  removeItem(id: string): boolean;
  getItems(): ContextItem[];
  compress(): ContextItem[];
  getTokenCount(): number;
  fitToWindow(maxTokens: number): ContextItem[];
}
