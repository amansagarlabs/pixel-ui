import { describe, it, expect } from 'vitest';
import { createRouter } from './router';

describe('createRouter', () => {
  const models = [
    { id: 'gpt4', name: 'GPT-4', provider: 'openai', priority: 1, weight: 0.8, maxTokens: 8192, costPer1kTokens: 0.03 },
    { id: 'gpt35', name: 'GPT-3.5', provider: 'openai', priority: 2, weight: 0.5, maxTokens: 4096, costPer1kTokens: 0.002 }
  ];

  it('should create a router', () => {
    const router = createRouter({ models });
    expect(router).toBeDefined();
  });

  it('should route by priority', async () => {
    const router = createRouter({ models, strategy: 'priority' });
    const response = await router.route({ task: 'test', complexity: 'low', requirements: [] });
    expect(response.model.id).toBe('gpt4');
  });

  it('should route by cost', async () => {
    const router = createRouter({ models, strategy: 'cost' });
    const response = await router.route({ task: 'test', complexity: 'low', requirements: [] });
    expect(response.model.id).toBe('gpt35');
  });

  it('should add model', () => {
    const router = createRouter({ models });
    router.addModel({ id: 'claude', name: 'Claude', provider: 'anthropic', priority: 1, weight: 0.7, maxTokens: 8192, costPer1kTokens: 0.015 });
    expect(router.getModels().length).toBe(3);
  });

  it('should remove model', () => {
    const router = createRouter({ models });
    router.removeModel('gpt35');
    expect(router.getModels().length).toBe(1);
  });
});
