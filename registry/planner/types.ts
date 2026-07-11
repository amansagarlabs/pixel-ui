export interface PlanStep {
  id: string;
  description: string;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: unknown;
}

export interface Plan {
  id: string;
  goal: string;
  steps: PlanStep[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannerConfig {
  maxSteps?: number;
  allowParallel?: boolean;
  retryFailed?: boolean;
}

export interface Planner {
  createPlan(goal: string): Promise<Plan>;
  executePlan(plan: Plan): Promise<Plan>;
  getNextStep(plan: Plan): PlanStep | undefined;
  updateStep(plan: Plan, stepId: string, status: PlanStep['status'], result?: unknown): Plan;
}
