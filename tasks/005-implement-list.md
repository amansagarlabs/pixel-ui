# Task 005: Implement `agentcn list`

## Objective

Implement the `list` command that shows installed primitives.

---

## Acceptance Criteria

- [ ] Read `agentcn.json`
- [ ] List all installed primitives
- [ ] Show version numbers
- [ ] Support `--json` output
- [ ] Support `--verbose` output

---

## Technical Details

### Flow

```
1. Load agentcn.json
2. Get primitives list
3. Format output
4. Display to user
```

### Implementation

```typescript
export const listCommand = new Command('list')
  .description('List installed primitives')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show details')
  .action(async (options) => {
    try {
      // 1. Load config
      // 2. Get primitives
      // 3. Format output
      // 4. Display
    } catch (error) {
      console.error(chalk.red('Failed to list primitives'));
      process.exit(1);
    }
  });
```

### Output Formats

**Default:**

```
Installed primitives:
  - planner (1.0.0)
  - memory (1.0.0)
```

**JSON:**

```json
{
  "primitives": [
    { "name": "planner", "version": "1.0.0" },
    { "name": "memory", "version": "1.0.0" }
  ]
}
```

**Verbose:**

```
Installed primitives:
  - planner (1.0.0)
    Category: runtime
    Files: 9
    Last updated: 2024-01-15
  - memory (1.0.0)
    Category: memory
    Files: 7
    Last updated: 2024-01-15
```

---

## Testing

- [ ] Lists primitives correctly
- [ ] Handles empty list
- [ ] JSON output valid
- [ ] Verbose shows details

---

## Definition of Done

- [ ] Command implemented
- [ ] Output formats working
- [ ] Tests passing

---

## References

- [CLI_SPEC.md](../docs/CLI_SPEC.md)
