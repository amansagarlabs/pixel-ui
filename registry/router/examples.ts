import { createRouter } from './router';

async function basicRouting() {
  const router = createRouter({
    models: [
      { id: 'gpt4', name: 'GPT-4', provider: 'openai', priority: 1, weight: 0.8, maxTokens: 8192, costPer1kTokens: 0.03 },
      { id: 'gpt35', name: 'GPT-3.5', provider: 'openai', priority: 2, weight: 0.5, maxTokens: 4096, costPer1kTokens: 0.002 }
    ],
    strategy: 'priority'
  });

  const response = await router.route({
    task: 'Complex reasoning task',
    complexity: 'high',
    requirements: ['accuracy']
  });

  console.log('Selected:', response.model.name);
}

async function costOptimizedRouting() {
  const router = createRouter({
    models: [
      { id: 'gpt4', name: 'GPT-4', provider: 'openai', priority: 1, weight: 0.8, maxTokens: 8192, costPer1kTokens: 0.03 },
      { id: 'gpt35', name: 'GPT-3.5', provider: 'openai', priority: 2, weight: 0.5, maxTokens: 4096, costPer1kTokens: 0.002 }
    ],
    strategy: 'cost'
  });

  const response = await router.route({
    task: 'Simple classification',
    complexity: 'low',
    requirements: ['fast', 'cheap']
  });

  console.log('Cost-optimized:', response.model.name);
}

export { basicRouting, costOptimizedRouting };
