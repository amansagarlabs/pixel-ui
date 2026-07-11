import { describe, it, expect } from 'vitest';
import { createEvaluator } from './evaluator';

describe('createEvaluator', () => {
  it('should create an evaluator with default config', () => {
    const evaluator = createEvaluator();
    expect(evaluator).toBeDefined();
  });

  it('should create an evaluator with criteria', () => {
    const evaluator = createEvaluator({
      criteria: [
        {
          id: 'accuracy',
          name: 'Accuracy',
          description: 'How accurate is the output',
          weight: 0.5,
          scoreRange: [0, 1]
        }
      ]
    });

    const criteria = evaluator.getCriteria();
    expect(criteria.length).toBe(1);
    expect(criteria[0].name).toBe('Accuracy');
  });

  it('should add criteria', () => {
    const evaluator = createEvaluator();
    
    evaluator.addCriteria({
      id: 'quality',
      name: 'Quality',
      description: 'Output quality',
      weight: 0.7,
      scoreRange: [0, 10]
    });

    const criteria = evaluator.getCriteria();
    expect(criteria.length).toBe(1);
    expect(criteria[0].id).toBe('quality');
  });

  it('should remove criteria', () => {
    const evaluator = createEvaluator({
      criteria: [
        {
          id: 'test',
          name: 'Test',
          description: 'Test criteria',
          weight: 1,
          scoreRange: [0, 1]
        }
      ]
    });

    evaluator.removeCriteria('test');
    const criteria = evaluator.getCriteria();
    expect(criteria.length).toBe(0);
  });

  it('should evaluate target', async () => {
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

    const evaluation = await evaluator.evaluate('test output', 'text');
    
    expect(evaluation.id).toBeDefined();
    expect(evaluation.targetType).toBe('text');
    expect(evaluation.results.length).toBe(1);
    expect(evaluation.overallScore).toBeGreaterThanOrEqual(0);
    expect(evaluation.overallScore).toBeLessThanOrEqual(1);
  });

  it('should calculate weighted overall score', async () => {
    const evaluator = createEvaluator({
      criteria: [
        {
          id: 'c1',
          name: 'Criteria 1',
          description: 'First criteria',
          weight: 0.3,
          scoreRange: [0, 1]
        },
        {
          id: 'c2',
          name: 'Criteria 2',
          description: 'Second criteria',
          weight: 0.7,
          scoreRange: [0, 1]
        }
      ]
    });

    const evaluation = await evaluator.evaluate('test', 'text');
    
    expect(evaluation.overallScore).toBeGreaterThanOrEqual(0);
    expect(evaluation.overallScore).toBeLessThanOrEqual(1);
  });
});
