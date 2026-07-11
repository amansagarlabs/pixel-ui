import { randomUUID } from 'crypto';
import { EvaluationCriteriaSchema, EvaluationSchema, EvaluatorConfigSchema } from './schema';
import type { EvaluationCriteria, Evaluation, EvaluatorConfig, Evaluator } from './types';

export function createEvaluator(config: EvaluatorConfig = {}): Evaluator {
  const validatedConfig = EvaluatorConfigSchema.parse(config);
  const criteria: Map<string, EvaluationCriteria> = new Map();

  // Initialize with default criteria
  if (validatedConfig.criteria) {
    for (const c of validatedConfig.criteria) {
      const validated = EvaluationCriteriaSchema.parse(c);
      criteria.set(validated.id, validated);
    }
  }

  function calculateScore(target: unknown, criterion: EvaluationCriteria): number {
    // Placeholder scoring logic
    // In real implementation, this would use AI or rules
    const [min, max] = criterion.scoreRange;
    return Math.random() * (max - min) + min;
  }

  function generateFeedback(target: unknown, criterion: EvaluationCriteria, score: number): string {
    // Placeholder feedback generation
    const threshold = validatedConfig.threshold;
    if (score >= threshold) {
      return `${criterion.name}: Good performance (${score.toFixed(2)})`;
    }
    return `${criterion.name}: Needs improvement (${score.toFixed(2)})`;
  }

  return {
    async evaluate(target: unknown, targetType: string): Promise<Evaluation> {
      const results = Array.from(criteria.values()).map(c => {
        const score = calculateScore(target, c);
        return {
          criteriaId: c.id,
          score,
          feedback: generateFeedback(target, c, score)
        };
      });

      const overallScore = results.reduce((sum, r) => {
        const criterion = criteria.get(r.criteriaId);
        return sum + r.score * (criterion?.weight || 1);
      }, 0) / results.length;

      return EvaluationSchema.parse({
        id: randomUUID(),
        targetId: String(target),
        targetType,
        criteria: Array.from(criteria.values()),
        results,
        overallScore,
        createdAt: new Date()
      });
    },

    addCriteria(criterion: EvaluationCriteria): void {
      const validated = EvaluationCriteriaSchema.parse(criterion);
      criteria.set(validated.id, validated);
    },

    removeCriteria(criteriaId: string): void {
      criteria.delete(criteriaId);
    },

    getCriteria(): EvaluationCriteria[] {
      return Array.from(criteria.values());
    }
  };
}
