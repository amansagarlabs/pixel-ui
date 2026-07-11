# CLI Specification

## Overview

The pixel-ui CLI is a command-line tool for managing AI agent primitives.

---

## Installation

```bash
# Using npx (recommended)
npx pixel-ui <command>

# Using npm
npm install -g pixel-ui
pixel-ui <command>

# Using pnpm
pnpm add -g pixel-ui
pixel-ui <command>
```

---

## Commands

### `pixel-ui init`

Initialize a new pixel-ui project.

**Usage:**

```bash
pixel-ui init [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-y, --yes` | Skip prompts | false |
| `--template <name>` | Use template | default |

**Behavior:**

1. Creates `pixel-ui.json` in current directory
2. Creates `primitives/` directory
3. Optionally installs initial primitives

**Output:**

```
✔ pixel-ui project initialized!

Next steps:
  1. Install primitives:
     npx pixel-ui add planner
  2. Start building your AI agent!
```

---

### `pixel-ui add <primitive>`

Add a primitive to your project.

**Usage:**

```bash
pixel-ui add <primitive> [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-y, --yes` | Skip prompts | false |
| `--registry <url>` | Registry URL | https://registry.pixel-ui.amansagar.in |
| `--force` | Overwrite existing | false |

**Behavior:**

1. Fetches primitive from registry
2. Downloads all files
3. Writes to `primitives/<name>/`
4. Updates `pixel-ui.json`
5. Installs dependencies if needed

**Output:**

```
✔ Added planner!

Files added:
  - index.ts
  - planner.ts
  - types.ts
  - schema.ts
  - prompt.md
  - README.md
  - examples.ts
  - planner.test.ts
  - planner.eval.ts
```

---

### `pixel-ui remove <primitive>`

Remove a primitive from your project.

**Usage:**

```bash
pixel-ui remove <primitive> [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-y, --yes` | Skip prompts | false |

**Behavior:**

1. Removes `primitives/<name>/` directory
2. Updates `pixel-ui.json`

**Output:**

```
✔ Removed planner!
```

---

### `pixel-ui list`

List installed primitives.

**Usage:**

```bash
pixel-ui list [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--json` | Output as JSON | false |
| `--verbose` | Show details | false |

**Output:**

```
Installed primitives:
  - planner (1.0.0)
  - memory (1.0.0)
  - browser (1.0.0)
```

---

### `pixel-ui doctor`

Check your environment for issues.

**Usage:**

```bash
pixel-ui doctor [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--fix` | Auto-fix issues | false |

**Checks:**

- Node.js version
- npm/pnpm version
- pixel-ui.json exists
- Primitives directory exists
- Missing retries
- Prompt size
- Missing telemetry
- Missing tests
- Recursion risks
- Context overflow
- Approval gates
- Security issues

**Output:**

```
pixel-ui Doctor

✔ Node.js version: v20.11.0
✔ npm version: 10.2.4
✔ pixel-ui.json: Found
✔ Primitives directory: Found
⚠ planner: Missing retry logic
  Fix: Add retry primitive
✗ memory: No tests found
  Fix: Add memory.test.ts
```

---

### `pixel-ui test [primitive]`

Run tests for installed primitives.

**Usage:**

```bash
pixel-ui test [primitive] [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--coverage` | Show coverage | false |
| `--verbose` | Verbose output | false |

**Behavior:**

1. If primitive specified, run only those tests
2. Otherwise, run all primitive tests
3. Report results

**Output:**

```
Testing planner...
  ✓ should create a plan
  ✓ should execute a plan
  ✓ should handle failed steps

Testing memory...
  ✓ should store entries
  ✓ should retrieve entries
  ✓ should search entries

Tests: 6 passed, 6 total
```

---

### `pixel-ui upgrade [primitive]`

Upgrade installed primitives to latest versions.

**Usage:**

```bash
pixel-ui upgrade [primitive] [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--registry <url>` | Registry URL | https://registry.pixel-ui.amansagar.in |
| `--all` | Upgrade all primitives | false |

**Behavior:**

1. Check for updates
2. Download new versions
3. Replace files
4. Update versions in pixel-ui.json

**Output:**

```
Upgrading primitives...
  ✓ planner: 1.0.0 → 1.1.0
  - memory: already at latest
  ✓ browser: 1.0.0 → 1.0.1

Upgrade complete!
```

---

## Configuration

### pixel-ui.json

Created by `pixel-ui init`:

```json
{
  "primitives": ["planner", "memory"],
  "style": "default",
  "TypeScript": true,
  "registry": "https://registry.pixel-ui.amansagar.in",
  "versions": {
    "planner": "1.0.0",
    "memory": "1.0.0"
  }
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `primitives` | string[] | Installed primitives |
| `style` | string | Coding style |
| `TypeScript` | boolean | Use TypeScript |
| `registry` | string | Registry URL |
| `versions` | Record<string, string> | Installed versions |

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `No pixel-ui.json found` | Not initialized | Run `pixel-ui init` |
| `Primitive not found` | Invalid name | Check spelling |
| `Download failed` | Network error | Check connection |
| `Permission denied` | File permissions | Check write access |

### Error Output

```
✖ Failed to add planner

Error: Request failed with status code 404
  at RegistryClient.getPrimitive
  at AddCommand.execute
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `KIDB_REGISTRY` | Registry URL | https://registry.pixel-ui.amansagar.in |
| `KIDB_CACHE` | Cache directory | .pixel-ui-cache |
| `KIDB_DEBUG` | Debug mode | false |

---

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Network error |
| 4 | File error |
| 5 | Validation error |
