import { createMemory } from './memory';

// Example 1: Basic memory usage
async function basicMemory() {
  const memory = createMemory();

  // Store some memories
  memory.store('User asked about the weather', 'short_term');
  memory.store('User lives in New York', 'long_term', { source: 'conversation' });
  memory.store('User prefers Celsius', 'long_term', { source: 'user preferences' });

  // Search for memories
  const weatherMemories = memory.search('weather');
  console.log('Weather memories:', weatherMemories.length);

  // Get all memories
  const stats = memory.getStats();
  console.log('Memory stats:', stats);
}

// Example 2: Conversation context
async function conversationContext() {
  const memory = createMemory({
    maxShortTerm: 50,
    defaultTTL: 1800000 // 30 minutes
  });

  // Store conversation turns
  memory.store('What is the capital of France?', 'short_term', { role: 'user' });
  memory.store('The capital of France is Paris.', 'short_term', { role: 'assistant' });

  // Later, retrieve context
  const context = memory.search('France');
  console.log('France context:', context);
}

// Example 3: Learning user preferences
async function learnPreferences() {
  const memory = createMemory();

  // Store user preferences over time
  memory.store('User likes dark mode', 'long_term', { category: 'preferences' });
  memory.store('User prefers concise responses', 'long_term', { category: 'preferences' });
  memory.store('User is a developer', 'long_term', { category: 'user_info' });

  // Retrieve preferences when needed
  const preferences = memory.search('preferences');
  console.log('User preferences:', preferences);
}

export { basicMemory, conversationContext, learnPreferences };
