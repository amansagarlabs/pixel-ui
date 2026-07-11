# AgentCN Architecture

## System Overview

AgentCN is a modular AI agent platform built on a registry pattern similar to shadcn/ui.

## Core Components

### CLI (`packages/cli`)
- Command-line interface for managing primitives
- Commands: init, add, remove, list, doctor, test, upgrade
- No business logic - delegates to registry package

### Registry (`packages/registry`)
- Central repository of agent primitives
- Schema validation and file downloading
- Caching and version management

### Primitives

Each primitive follows a standard structure:

```
primitive/
├── index.ts          # Main export
├── primitive.ts      # Core implementation
├── schema.ts         # Zod schemas
├── types.ts          # TypeScript types
├── prompt.md         # System prompts
├── README.md         # Documentation
├── examples.ts       # Usage examples
├── primitive.test.ts # Unit tests
└── primitive.eval.ts # Evaluations
```

### Available Primitives

| Primitive | Description |
|-----------|-------------|
| planner | Task decomposition and planning |
| memory | Short-term and long-term memory |
| browser | Web browsing and interaction |
| evaluator | Output evaluation and scoring |
| reflection | Self-reflection and improvement |
| retry | Retry logic with backoff |
| approval | Human-in-the-loop approval |
| router | Multi-model routing |
| telemetry | Logging and monitoring |

## Data Flow

```
User Request
    ↓
CLI (init/add/remove)
    ↓
Registry (download/validate)
    ↓
Project (install/configure)
    ↓
Runtime (execute primitives)
```

## Design Principles

1. **Modularity** - Each primitive is independent
2. **Composability** - Primitives work together
3. **Type Safety** - Full TypeScript support
4. **Testability** - Built-in testing and evaluation
5. **Documentation** - Auto-generated from code
