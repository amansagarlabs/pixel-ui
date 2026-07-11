# Security Primitive

The security primitive provides guardrails and safety checks for AI agents.

## Installation

```bash
npx agentcn add security
```

## Usage

```typescript
import { createSecurityGuard } from './security';

const guard = createSecurityGuard({
  rules: [
    {
      id: 'no-api-keys',
      name: 'No API Keys',
      type: 'input',
      pattern: /api[_-]?key|secret|token/i,
      action: 'block',
      message: 'API keys are not allowed'
    }
  ]
});

// Check user input
const results = guard.checkInput('My api_key is abc123');
const violations = results.filter(r => !r.passed);
```

## API

### `createSecurityGuard(config)`

Creates a new security guard.

### `guard.checkInput(input)`

Checks input for security violations.

### `guard.checkOutput(output)`

Checks output for security violations.

### `guard.addRule(rule)`

Adds a new security rule.

### `guard.removeRule(ruleId)`

Removes a security rule.

### `guard.getRules()`

Returns all security rules.
