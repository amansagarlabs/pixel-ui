# Task 006: Implement `agentcn doctor`

## Objective

Implement the `doctor` command that checks the environment for issues.

---

## Acceptance Criteria

- [ ] Check Node.js version
- [ ] Check npm/pnpm version
- [ ] Check agentcn.json exists
- [ ] Check primitives directory exists
- [ ] Check for missing retries
- [ ] Check prompt size
- [ ] Check for missing telemetry
- [ ] Check for missing tests
- [ ] Check for recursion risks
- [ ] Check for context overflow
- [ ] Check for approval gates
- [ ] Check for security issues
- [ ] Show colored output
- [ ] Support `--fix` flag

---

## Technical Details

### Checks

```typescript
interface Check {
  name: string;
  check: () => Promise<{ pass: boolean; message: string; fix?: string }>;
}

const checks: Check[] = [
  {
    name: 'Node.js version',
    check: async () => {
      const version = process.version;
      const major = parseInt(version.slice(1));
      return {
        pass: major >= 18,
        message: version,
        fix: major < 18 ? 'Upgrade to Node.js 18 or higher' : undefined
      };
    }
  },
  {
    name: 'agentcn.json',
    check: async () => {
      const exists = await fs.pathExists('agentcn.json');
      return {
        pass: exists,
        message: exists ? 'Found' : 'Not found',
        fix: exists ? undefined : 'Run `agentcn init`'
      };
    }
  },
  // ... more checks
];
```

### Output

```
AgentCN Doctor

✔ Node.js version: v20.11.0
✔ npm version: 10.2.4
✔ agentcn.json: Found
✔ Primitives directory: Found
⚠ planner: Missing retry logic
  Fix: Add retry primitive
✗ memory: No tests found
  Fix: Add memory.test.ts
```

### Auto-fix

```typescript
async function autoFix(issues: Issue[]): Promise<void> {
  for (const issue of issues) {
    if (issue.fix) {
      await applyFix(issue);
    }
  }
}
```

---

## Testing

- [ ] Detects missing Node.js
- [ ] Detects missing agentcn.json
- [ ] Detects missing tests
- [ ] Shows correct output
- [ ] Auto-fix works

---

## Definition of Done

- [ ] All checks implemented
- [ ] Output formatted correctly
- [ ] Auto-fix working
- [ ] Tests passing

---

## References

- [CLI_SPEC.md](../docs/CLI_SPEC.md)
