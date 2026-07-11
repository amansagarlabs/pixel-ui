import { createSecurityGuard } from './security';

async function basicSecurity() {
  const guard = createSecurityGuard({
    rules: [
      {
        id: 'no-secrets',
        name: 'No Secrets',
        type: 'input',
        pattern: /secret|password|api[_-]?key/i,
        action: 'block',
        message: 'Secrets are not allowed'
      }
    ]
  });

  const results = guard.checkInput('My password is 123456');
  console.log('Violations:', results.filter(r => !r.passed).length);
}

export { basicSecurity };
