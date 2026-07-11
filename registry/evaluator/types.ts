export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  scoreRange: [number, number];
}

export interface EvaluationResult {
  criteriaId: string;
  score: number;
  feedback: string;
}

export interface Evaluation {
  id: string;
  targetId: string;
  targetType: string;
  criteria: EvaluationCriteria[];
  results: EvaluationResult[];
  overallScore: number;
  createdAt: Date;
}

export interface EvaluatorConfig {
  criteria?: EvaluationCriteria[];
  threshold?: number;
}

export interface Evaluator {
  evaluate(target: unknown, targetType: string): Promise<Evaluation>;
  addCriteria(criteria: EvaluationCriteria): void;
  removeCriteria(criteriaId: string): void;
  getCriteria(): EvaluationCriteria[];
}
