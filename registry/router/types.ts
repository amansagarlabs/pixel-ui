export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  priority: number;
  weight: number;
  maxTokens: number;
  costPer1kTokens: number;
}

export interface RouteRequest {
  task: string;
  complexity: 'low' | 'medium' | 'high';
  requirements: string[];
}

export interface RouteResponse {
  model: ModelConfig;
  reason: string;
}

export interface RouterConfig {
  models: ModelConfig[];
  strategy?: 'priority' | 'round-robin' | 'cost' | 'capability';
}

export interface Router {
  route(request: RouteRequest): Promise<RouteResponse>;
  getModels(): ModelConfig[];
  addModel(model: ModelConfig): void;
  removeModel(modelId: string): void;
}
