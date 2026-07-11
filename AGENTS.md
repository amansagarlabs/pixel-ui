# pixel-ui Development Guide

## Project Overview

pixel-ui is the shadcn/ui for AI Agent Engineering - an open-source registry of production-ready AI agent primitives.

---

## Project Structure

```
pixel-ui/
├── docs/                    # Documentation
│   ├── PRD.md              # Product Requirements
│   ├── TRD.md              # Technical Requirements
│   ├── ARCHITECTURE.md     # System Architecture
│   ├── REGISTRY_SPEC.md    # Registry Specification
│   ├── CLI_SPEC.md         # CLI Specification
│   └── CONTRIBUTING.md     # Contribution Guide
├── tasks/                   # Implementation tickets
├── apps/                    # Applications
│   └── docs/               # Next.js 16 documentation site
├── packages/                # Packages
│   ├── cli/                # CLI tool (7 commands)
│   ├── core/               # Core utilities
│   ├── registry-sdk/       # Registry SDK
│   └── sdk/                # SDK with factory functions
├── registry/                # Primitive definitions
│   ├── planner/
│   ├── memory/
│   ├── browser/
│   ├── evaluator/
│   ├── reflection/
│   ├── retry/
│   ├── approval/
│   ├── router/
│   ├── telemetry/
│   ├── security/
│   └── context/
├── .github/workflows/      # CI/CD pipelines
│   └── ci.yml
└── turbo.json              # Turborepo config
```

---

## Current Status

### Completed

- Monorepo structure with Turborepo
- CLI package with 7 commands (init, add, remove, list, doctor, test, upgrade)
- Registry SDK (RegistryClient, ConfigManager, CacheManager)
- Core package (types, schemas, validators)
- SDK package with factory functions for all primitives
- 11 primitives implemented and tested
- Next.js 16 docs site with Vercel-style design
- Git repo on GitHub: https://github.com/amansagar070707-crypto/pixel-ui.git
- CI/CD pipeline with GitHub Actions

### In Progress

- Publishing packages to npm
- Registry website

### Blocked

- (none)

---

## Development Workflow

### Running the Project

```bash
npm install          # Install dependencies
npm run dev          # Start docs site
npm test             # Run all tests
npm run lint         # Lint code
npm run typecheck    # Type checking
```

### Adding a New Primitive

1. Create directory in `registry/<name>/`
2. Add `index.ts`, `<name>.ts`, `types.ts`, `schema.ts`, `prompt.md`
3. Add tests in `<name>.test.ts`
4. Update `registry/registry.json`
5. Add factory function to `packages/sdk/`

---

## Code Conventions

### TypeScript

- Use strict TypeScript
- Prefer interfaces over types
- Use Zod for validation
- Export types explicitly

### File Naming

- Files: `kebab-case.ts`
- Types: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Structure

```typescript
// Imports
import { z } from 'zod';

// Schemas
export const MySchema = z.object({});

// Types
export type MyType = z.infer<typeof MySchema>;

// Implementation
export function myFunction(): MyType {
  // ...
}
```

---

## Testing

### Unit Tests

- Location: Alongside source files
- Framework: Vitest
- Coverage: 90%+ target

### Running Tests

```bash
npm test          # Run all tests
npm run lint      # Lint code
npm run typecheck # Type checking
```

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './my-module';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(expected);
  });
});
```

---

## Registry Primitives

### Implemented

- **Runtime**: planner, reflection, retry, approval, router
- **Memory**: memory
- **Tools**: browser
- **Observability**: telemetry
- **Evaluation**: evaluator
- **Security**: security
- **Context Engineering**: context

### Structure

Every primitive follows this layout:

```
primitive/
├── index.ts           # Public exports
├── primitive.ts       # Core implementation
├── types.ts           # TypeScript types
├── schema.ts          # Zod schemas
├── prompt.md          # System prompt
├── primitive.test.ts  # Unit tests
└── CHANGELOG.md       # Version history
```

---

## CLI Commands

```bash
pixel-ui init              # Initialize project
pixel-ui add <primitive>   # Add primitive
pixel-ui remove <primitive> # Remove primitive
pixel-ui list              # List installed
pixel-ui doctor            # Check environment
pixel-ui test [primitive]  # Run tests
pixel-ui upgrade           # Update primitives
```

---

## Key Principles

1. **Copy Source** - Never hide implementation
2. **Framework Agnostic** - Works anywhere
3. **Type Safe** - Strict TypeScript
4. **Production First** - Tests, docs, evaluation included

---

## References

- [PRD.md](docs/PRD.md) - Product Requirements
- [TRD.md](docs/TRD.md) - Technical Requirements
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System Architecture
- [REGISTRY_SPEC.md](docs/REGISTRY_SPEC.md) - Registry Specification
- [CLI_SPEC.md](docs/CLI_SPEC.md) - CLI Specification
- [CONTRIBUTING.md](docs/CONTRIBUTING.md) - Contribution Guide
