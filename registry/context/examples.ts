import { createContextManager } from './context';

async function basicContext() {
  const manager = createContextManager({ maxTokens: 1000 });
  
  manager.addItem({ content: 'User prefers dark mode', priority: 8, metadata: { source: 'preference' } });
  manager.addItem({ content: 'Current task: summarize document', priority: 10, metadata: { source: 'task' } });
  manager.addItem({ content: 'Old conversation history', priority: 2, metadata: { source: 'history' } });
  
  const compressed = manager.compress();
  console.log('Compressed items:', compressed.length);
}

export { basicContext };
