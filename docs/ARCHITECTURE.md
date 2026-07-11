# Architecture

## System Overview

pixel-ui is a monorepo-based system with three main layers:

1. **CLI Layer** - User interface for managing primitives
2. **Registry Layer** - Package management and distribution
3. **Primitive Layer** - Reusable AI agent components

---

## Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        User Project                         │
├─────────────────────────────────────────────────────────────┤
│  primitives/                                                │
│    ├── planner/                                             │
│    ├── memory/                                              │
│    └── ...                                                  │
│  pixel-ui.json                                          │
└─────────────────────────────────────────────────────────────┘
                           ↑
                           │ install/copy
                           │
┌─────────────────────────────────────────────────────────────┐
│                         CLI Layer                           │
├─────────────────────────────────────────────────────────────┤
│  pixel-ui init | add | remove | list | doctor | test    │
└─────────────────────────────────────────────────────────────┘
                           ↑
                           │ fetch
                           │
┌─────────────────────────────────────────────────────────────┐
│                       Registry Layer                        │
├─────────────────────────────────────────────────────────────┤
│  Registry Client  │  Config Manager  │  File Downloader     │
└─────────────────────────────────────────────────────────────┘
                           ↑
                           │ resolve
                           │
┌─────────────────────────────────────────────────────────────┐
│                      Primitive Layer                        │
├─────────────────────────────────────────────────────────────┤
│  planner │ memory │ browser │ evaluator │ reflection │ ...  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Install Flow

```
1. User runs: pixel-ui add planner
2. CLI reads pixel-ui.json
3. CLI fetches planner/registry.json from registry
4. CLI downloads all files listed in registry.json
5. CLI writes files to primitives/planner/
6. CLI updates pixel-ui.json
7. CLI installs dependencies if needed
```

### Runtime Flow

```
1. User imports primitive: import { createPlanner } from './primitives/planner'
2. User instantiates: const planner = createPlanner()
3. User calls methods: const plan = await planner.createPlan(goal)
4. Primitive executes logic
5. Primitive returns result
```

---

## Package Architecture

### packages/cli

**Purpose**: Command-line interface

**Dependencies**: commander, prompts, chalk, ora

**Exports**: CLI commands

**Key Classes**:
- `InitCommand` - Project initialization
- `AddCommand` - Primitive installation
- `RemoveCommand` - Primitive removal
- `ListCommand` - List installed primitives
- `DoctorCommand` - Environment checks
- `TestCommand` - Run primitive tests
- `UpgradeCommand` - Update primitives

### packages/registry

**Purpose**: Registry client and configuration

**Dependencies**: axios, fs-extra, zod

**Exports**: RegistryClient, ConfigManager

**Key Classes**:
- `RegistryClient` - Fetch primitives from registry
- `ConfigManager` - Read/write pixel-ui.json
- `FileDownloader` - Download primitive files
- `CacheManager` - Cache registry responses

### packages/core

**Purpose**: Shared types and utilities

**Dependencies**: zod

**Exports**: Schemas, types, validators

**Key Modules**:
- `schemas` - Zod schemas for validation
- `types` - TypeScript type definitions
- `validators` - Validation functions

### packages/sdk

**Purpose**: JavaScript/TypeScript SDK

**Dependencies**: @pixel-ui/core

**Exports**: Factory functions for primitives

**Key Functions**:
- `createAgent()` - Create configured agent
- `createPlanner()` - Create planner instance
- `createMemory()` - Create memory instance
- etc.

---

## Primitive Architecture

Each primitive follows this structure:

```
primitive/
├── registry.json      # Registry metadata
├── index.ts           # Public exports
├── primitive.ts       # Core implementation
├── types.ts           # TypeScript types
├── schema.ts          # Zod schemas
├── prompt.md          # System prompt
├── README.md          # Documentation
├── examples.ts        # Usage examples
├── primitive.test.ts  # Unit tests
├── primitive.eval.ts  # Evaluation tests
└── CHANGELOG.md       # Version history
```

### Interface Contract

Every primitive must implement:

```typescript
interface Primitive {
  // Core functionality
  execute(input: unknown): Promise<unknown>;
  
  // Lifecycle
  init?(config: unknown): Promise<void>;
  destroy?(): Promise<void>;
  
  // Introspection
  getMetadata?(): PrimitiveMetadata;
}
```

---

## Security Architecture

### Principles

1. **No secrets in code** - Environment variables only
2. **Input validation** - Zod schemas for all inputs
3. **Sandboxing** - Primitives run in isolated contexts
4. **Audit logging** - All operations logged
5. **Rate limiting** - Prevent abuse

### Implementation

- All primitives validate inputs with Zod
- No `eval()` or dynamic code execution
- File operations use allowlists
- Network requests go through approved proxies
- Secrets stored in environment, never in code

---

## Testing Architecture

### Unit Tests

- Located alongside source: `primitive.test.ts`
- Use Vitest
- Mock external dependencies
- Test edge cases and errors

### Integration Tests

- Located in `tests/integration/`
- Test primitive interactions
- Use real implementations where possible

### Evaluation Tests

- Located alongside source: `primitive.eval.ts`
- Measure quality metrics
- Run against benchmarks
- Track regression over time

### E2E Tests

- Located in `tests/e2e/`
- Test CLI commands end-to-end
- Use temporary directories
- Clean up after execution

---

## Deployment Architecture

### Registry

- Hosted on GitHub
- Served via CDN
- Versioned with Git tags
- Validated with CI/CD

### Documentation

- Built with Next.js
- Deployed to Vercel
- Auto-updated on merge

### CLI

- Published to npm
- Installed via npx
- No global installation required

---

## Scalability Considerations

### Registry Growth

- Lazy loading of primitive metadata
- Pagination for large lists
- Search indexing for fast queries
- Caching at multiple levels

### Primitive Complexity

- Modular design allows selective imports
- Tree-shaking for minimal bundle size
- Optional dependencies
- Progressive enhancement

### Community Contributions

- Automated validation pipeline
- Template for new primitives
- Review process for quality
- Automated testing on submission
