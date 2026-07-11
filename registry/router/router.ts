import { RouterConfigSchema, RouteRequestSchema } from './schema';
import type { ModelConfig, RouteRequest, RouteResponse, RouterConfig, Router } from './types';

export function createRouter(config: RouterConfig): Router {
  const validatedConfig = RouterConfigSchema.parse(config);
  const models = new Map<string, ModelConfig>(validatedConfig.models.map(m => [m.id, m]));
  let currentIndex = 0;

  function selectByPriority(): ModelConfig {
    return Array.from(models.values()).sort((a, b) => a.priority - b.priority)[0];
  }

  function selectByRoundRobin(): ModelConfig {
    const modelList = Array.from(models.values());
    const model = modelList[currentIndex % modelList.length];
    currentIndex = (currentIndex + 1) % modelList.length;
    return model;
  }

  function selectByCost(): ModelConfig {
    return Array.from(models.values()).sort((a, b) => a.costPer1kTokens - b.costPer1kTokens)[0];
  }

  return {
    async route(request: RouteRequest): Promise<RouteResponse> {
      const validatedRequest = RouteRequestSchema.parse(request);
      
      let selectedModel: ModelConfig;
      
      switch (validatedConfig.strategy) {
        case 'round-robin':
          selectedModel = selectByRoundRobin();
          break;
        case 'cost':
          selectedModel = selectByCost();
          break;
        case 'priority':
        default:
          selectedModel = selectByPriority();
          break;
      }

      return {
        model: selectedModel,
        reason: `Selected based on ${validatedConfig.strategy} strategy`
      };
    },

    getModels(): ModelConfig[] {
      return Array.from(models.values());
    },

    addModel(model: ModelConfig): void {
      models.set(model.id, model);
    },

    removeModel(modelId: string): void {
      models.delete(modelId);
    }
  };
}
