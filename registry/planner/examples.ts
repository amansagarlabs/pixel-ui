import { createPlanner } from './planner';

// Example 1: Simple linear plan
async function linearPlan() {
  const planner = createPlanner();
  
  const plan = await planner.createPlan('Deploy a web application');
  
  // Add steps manually
  plan.steps = [
    {
      id: 'build',
      description: 'Build the application',
      dependencies: [],
      status: 'pending'
    },
    {
      id: 'test',
      description: 'Run tests',
      dependencies: ['build'],
      status: 'pending'
    },
    {
      id: 'deploy',
      description: 'Deploy to production',
      dependencies: ['test'],
      status: 'pending'
    }
  ];

  const result = await planner.executePlan(plan);
  console.log('Plan completed:', result.status);
}

// Example 2: Plan with parallel steps
async function parallelPlan() {
  const planner = createPlanner({ allowParallel: true });
  
  const plan = await planner.createPlan('Process multiple items');
  
  plan.steps = [
    {
      id: 'fetch',
      description: 'Fetch data from API',
      dependencies: [],
      status: 'pending'
    },
    {
      id: 'process-1',
      description: 'Process item 1',
      dependencies: ['fetch'],
      status: 'pending'
    },
    {
      id: 'process-2',
      description: 'Process item 2',
      dependencies: ['fetch'],
      status: 'pending'
    },
    {
      id: 'combine',
      description: 'Combine results',
      dependencies: ['process-1', 'process-2'],
      status: 'pending'
    }
  ];

  const result = await planner.executePlan(plan);
  console.log('Plan completed:', result.status);
}

// Example 3: Handle failed steps
async function failedPlan() {
  const planner = createPlanner({ retryFailed: true });
  
  const plan = await planner.createPlan('Risky operation');
  
  plan.steps = [
    {
      id: 'step1',
      description: 'Might fail',
      dependencies: [],
      status: 'pending'
    }
  ];

  const result = await planner.executePlan(plan);
  
  if (result.status === 'failed') {
    console.log('Some steps failed, retrying...');
  }
}

export { linearPlan, parallelPlan, failedPlan };
