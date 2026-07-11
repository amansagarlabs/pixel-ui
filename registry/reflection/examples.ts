import { createReflector } from './reflection';

async function basicReflection() {
  const reflector = createReflector();
  
  const reflection = await reflector.reflect(
    'What is the capital of France?',
    'The capital of France is Paris.'
  );
  
  console.log('Reflection:', reflection);
}

async function improveOutput() {
  const reflector = createReflector();
  
  const reflection = await reflector.reflect('input', 'initial output');
  const suggestions = await reflector.critique(reflection);
  const improved = await reflector.improve(reflection, suggestions);
  
  console.log('Improved output:', improved);
}

export { basicReflection, improveOutput };
