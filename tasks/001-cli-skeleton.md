# Task 001: CLI Skeleton

## Objective

Build the CLI skeleton with Commander.js that supports all planned commands.

---

## Acceptance Criteria

- [ ] Initialize Commander.js program
- [ ] Add `init` command (placeholder)
- [ ] Add `add` command (placeholder)
- [ ] Add `remove` command (placeholder)
- [ ] Add `list` command (placeholder)
- [ ] Add `doctor` command (placeholder)
- [ ] Add `test` command (placeholder)
- [ ] Add `upgrade` command (placeholder)
- [ ] Add `--version` flag
- [ ] Add `--help` for all commands
- [ ] CLI exits with proper exit codes

---

## Technical Details

### Package Structure

```
packages/cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── cli.ts          # Entry point
│   ├── index.ts        # Public exports
│   └── commands/
│       ├── init.ts
│       ├── add.ts
│       ├── remove.ts
│       ├── list.ts
│       ├── doctor.ts
│       ├── test.ts
│       └── upgrade.ts
```

### Dependencies

- `commander` - CLI framework
- `chalk` - Terminal colors
- `ora` - Spinners
- `prompts` - Interactive prompts

### CLI Entry Point

```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
// ... other imports

const program = new Command();

program
  .name('agentcn')
  .description('AI Agent primitives registry')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(addCommand);
// ... other commands

program.parse();
```

---

## Testing

- [ ] CLI runs without errors
- [ ] `--help` shows all commands
- [ ] `--version` shows version
- [ ] Invalid commands show error

---

## Definition of Done

- [ ] All commands registered
- [ ] Help text working
- [ ] Version flag working
- [ ] TypeScript compiles
- [ ] No lint errors

---

## References

- [Commander.js Docs](https://www.npmjs.com/package/commander)
- [CLI_SPEC.md](../docs/CLI_SPEC.md)
