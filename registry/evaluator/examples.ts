import { createEvaluator } from './evaluator';

// Example 1: Basic evaluation
async function basicEvaluation() {
  const evaluator = createEvaluator({
    criteria: [
      {
        id: 'accuracy',
        name: 'Accuracy',
        description: 'How accurate is the information',
        weight: 0.5,
        scoreRange: [0, 1]
      },
      {
        id: 'clarity',
        name: 'Clarity',
        description: 'How clear is the explanation',
        weight: 0.5,
        scoreRange: [0, 1]
      }
    ]
  });

  const evaluation = await evaluator.evaluate(
    'The capital of France is Paris.',
    'fact'
  );

  console.log('Overall score:', evaluation.overallScore);
  evaluation.results.forEach(r => {
    console.log(`${r.criteriaId}: ${r.score} - ${r.feedback}`);
  });
}

// Example 2: Custom criteria
async function customCriteria() {
  const evaluator = createEvaluator();

  evaluator.addCriteria({
    id: 'creativity',
    name: 'Creativity',
    description: 'How creative is the output',
    weight: 0.3,
    scoreRange: [0, 10]
  });

  evaluator.addCriteria({
    id: 'relevance',
    name: 'Relevance',
    description: 'How relevant to the prompt',
    weight: 0.7,
    scoreRange: [0, 10]
  });

  const evaluation = await evaluator.evaluate('A creative response', 'text');
  console.log('Score:', evaluation.overallScore);
}

// Example 3: Batch evaluation
async function batchEvaluation() {
  const evaluator = createEvaluator({
    criteria: [
      {
        id: 'quality',
        name: 'Quality',
        description: 'Output quality',
        weight: 1,
        scoreRange: [0, 1]
      }
    ]
  });

  const outputs = ['Output 1', 'Output 2', 'Output 3'];
  const evaluations = await Promise.all(
    outputs.map(output => evaluator.evaluate(output, 'text'))
  );

  evaluations.forEach((evaluation, i) => {
    console.log(`Output ${i + 1}: ${evaluation.overallScore}`);
  });
}

export { basicEvaluation, customCriteria, batchEvaluation };
