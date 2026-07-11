import { describe, it, expect } from 'vitest';
import { createPlanner } from './planner';

describe('createPlanner', () => {
  it('should create a planner with default config', () => {
    const planner = createPlanner();
    expect(planner).toBeDefined();
  });

  it('should create a plan', async () => {
    const planner = createPlanner();
    const plan = await planner.createPlan('Build a website');

    expect(plan.id).toBeDefined();
    expect(plan.goal).toBe('Build a website');
    expect(plan.steps).toEqual([]);
    expect(plan.status).toBe('pending');
  });

  it('should return undefined when no steps are available', () => {
    const planner = createPlanner();
    const plan = {
      id: '1',
      goal: 'Test',
      steps: [],
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    expect(planner.getNextStep(plan)).toBeUndefined();
  });

  it('should get next step with no dependencies', () => {
    const planner = createPlanner();
    const plan = {
      id: '1',
      goal: 'Test',
      steps: [
        {
          id: 'step1',
          description: 'First step',
          dependencies: [],
          status: 'pending' as const
        }
      ],
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    expect(planner.getNextStep(plan)?.id).toBe('step1');
  });

  it('should not get step with unfinished dependencies', () => {
    const planner = createPlanner();
    const plan = {
      id: '1',
      goal: 'Test',
      steps: [
        {
          id: 'step1',
          description: 'First step',
          dependencies: [],
          status: 'pending' as const
        },
        {
          id: 'step2',
          description: 'Second step',
          dependencies: ['step1'],
          status: 'pending' as const
        }
      ],
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    expect(planner.getNextStep(plan)?.id).toBe('step1');
  });

  it('should update step status', () => {
    const planner = createPlanner();
    const plan = {
      id: '1',
      goal: 'Test',
      steps: [
        {
          id: 'step1',
          description: 'First step',
          dependencies: [],
          status: 'pending' as const
        }
      ],
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updated = planner.updateStep(plan, 'step1', 'completed');
    expect(updated.steps[0].status).toBe('completed');
  });
});
