import { describe, it, expect } from 'vitest';
import { createSecurityGuard } from './security';

describe('createSecurityGuard', () => {
  const defaultRules = [
    {
      id: 'no-api-keys',
      name: 'No API Keys',
      type: 'input' as const,
      pattern: /api[_-]?key|secret|token/i,
      action: 'block' as const,
      message: 'API keys are not allowed'
    },
    {
      id: 'no-pii',
      name: 'No PII',
      type: 'output' as const,
      pattern: /\b\d{3}-\d{2}-\d{4}\b/,
      action: 'warn' as const,
      message: 'Potential PII detected'
    }
  ];

  it('should create a security guard', () => {
    const guard = createSecurityGuard({ rules: defaultRules });
    expect(guard).toBeDefined();
  });

  it('should check input for violations', () => {
    const guard = createSecurityGuard({ rules: defaultRules });
    const results = guard.checkInput('My api_key is abc123');
    
    expect(results.length).toBe(1);
    expect(results[0].passed).toBe(false);
  });

  it('should pass safe input', () => {
    const guard = createSecurityGuard({ rules: defaultRules });
    const results = guard.checkInput('Hello world');
    
    expect(results.length).toBe(1);
    expect(results[0].passed).toBe(true);
  });

  it('should add rule', () => {
    const guard = createSecurityGuard({ rules: [] });
    guard.addRule({
      id: 'test',
      name: 'Test',
      type: 'input',
      pattern: 'test',
      action: 'block',
      message: 'Test rule'
    });
    
    expect(guard.getRules().length).toBe(1);
  });

  it('should remove rule', () => {
    const guard = createSecurityGuard({ rules: defaultRules });
    guard.removeRule('no-api-keys');
    
    expect(guard.getRules().length).toBe(1);
  });
});
