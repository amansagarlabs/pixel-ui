import { randomUUID } from 'crypto';
import { PlanSchema, PlannerConfigSchema } from './schema';
import type { Plan, PlanStep, PlannerConfig, Planner } from './types';

export function createPlanner(config: PlannerConfig = {}): Planner {
  const validatedConfig = PlannerConfigSchema.parse(config);

  return {
    async createPlan(goal: string): Promise<Plan> {
      const plan: Plan = {
        id: randomUUID(),
        goal,
        steps: [],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return PlanSchema.parse(plan);
    },

    async executePlan(plan: Plan): Promise<Plan> {
      let currentPlan = { ...plan, status: 'in_progress' as const };

      while (true) {
        const nextStep = this.getNextStep(currentPlan);
        if (!nextStep) break;

        currentPlan = this.updateStep(currentPlan, nextStep.id, 'in_progress');

        try {
          // Step execution would be implemented by the user
          // This is a placeholder for the actual execution logic
          currentPlan = this.updateStep(currentPlan, nextStep.id, 'completed');
        } catch (error) {
          if (validatedConfig.retryFailed) {
            currentPlan = this.updateStep(currentPlan, nextStep.id, 'pending');
          } else {
            currentPlan = this.updateStep(currentPlan, nextStep.id, 'failed', error);
          }
        }
      }

      const hasFailed = currentPlan.steps.some(s => s.status === 'failed');
      return {
        ...currentPlan,
        status: hasFailed ? 'failed' : 'completed',
        updatedAt: new Date()
      };
    },

    getNextStep(plan: Plan): PlanStep | undefined {
      return plan.steps.find(
        step =>
          step.status === 'pending' &&
          step.dependencies.every(depId => {
            const dep = plan.steps.find(s => s.id === depId);
            return dep?.status === 'completed';
          })
      );
    },

    updateStep(plan: Plan, stepId: string, status: PlanStep['status'], result?: unknown): Plan {
      const steps = plan.steps.map(step =>
        step.id === stepId ? { ...step, status, result } : step
      );
      return { ...plan, steps, updatedAt: new Date() };
    }
  };
}
