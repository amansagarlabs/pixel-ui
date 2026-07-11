# Task 004: Implement `agentcn init`

## Objective

Implement the `init` command that initializes a new AgentCN project.

---

## Acceptance Criteria

- [ ] Create `agentcn.json` with defaults
- [ ] Create `primitives/` directory
- [ ] Prompt for initial primitives (unless `--yes`)
- [ ] Prompt for TypeScript preference
- [ ] Show success message with next steps

---

## Technical Details

### Flow

```
1. Check if already initialized
2. Prompt for configuration (unless --yes)
3. Create agentcn.json
4. Create primitives directory
5. Show success message
```

### Implementation

```typescript
export const initCommand = new Command('init')
  .description('Initialize a new AgentCN project')
  .option('-y, --yes', 'Skip prompts')
  .action(async (options) => {
    const spinner = ora('Initializing AgentCN project...').start();

    try {
      // 1. Check existing
      // 2. Prompt for config
      // 3. Create files
      // 4. Success message
    } catch (error) {
      spinner.fail(chalk.red('Failed to initialize project'));
      process.exit(1);
    }
  });
```

### Configuration

```typescript
interface InitConfig {
  primitives: string[];
  TypeScript: boolean;
  style: string;
}
```

### Prompts

```typescript
const response = await prompts([
  {
    type: 'multiselect',
    name: 'primitives',
    message: 'Which primitives would you like to install?',
    choices: [
      { title: 'planner', value: 'planner', selected: true },
      { title: 'memory', value: 'memory' },
      { title: 'browser', value: 'browser' }
    ]
  },
  {
    type: 'confirm',
    name: 'TypeScript',
    message: 'Use TypeScript?',
    initial: true
  }
]);
```

---

## Testing

- [ ] Creates agentcn.json correctly
- [ ] Creates primitives directory
- [ ] Handles existing project
- [ ] Respects --yes flag

---

## Definition of Done

- [ ] Command implemented
- [ ] Prompts working
- [ ] Files created correctly
- [ ] Tests passing

---

## References

- [CLI_SPEC.md](../docs/CLI_SPEC.md)
