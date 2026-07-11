# Registry Specification

## Overview

The pixel-ui Registry is a collection of AI agent primitives that can be installed into any project.

For public Pixel UI component distribution, the registry must also expose a shadcn-compatible registry surface. The shadcn-compatible surface is what lets users run commands such as:

```bash
npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/actions.json
```

Use the custom primitive registry for internal agent runtime primitives. Use the shadcn-compatible registry for UI components, hooks, config, pages, and other files users should copy into their apps.

---

## Public Registry Endpoints

Recommended launch endpoints:

```text
https://pixel.amansagar.in
https://registry.pixel-ui.amansagar.in/r/registry.json
https://registry.pixel-ui.amansagar.in/r/{name}.json
```

The product/docs site should live at `pixel.amansagar.in`. The registry JSON should live at `registry.pixel-ui.amansagar.in`.

Keep `https://www.amansagar.in/pixel-ui` as a portfolio page or redirect, not as the primary registry endpoint.

---

## shadcn-Compatible Registry

The shadcn CLI expects:

- A catalog at `/r/registry.json`.
- One item file per component at `/r/{name}.json`.
- Registry item types such as `registry:ui`, `registry:block`, `registry:component`, `registry:hook`, `registry:lib`, `registry:file`, `registry:page`, `registry:style`, and `registry:theme`.

Root catalog example:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "pixel-ui",
  "homepage": "https://pixel.amansagar.in",
  "items": [
    {
      "name": "actions",
      "type": "registry:ui",
      "title": "Actions",
      "description": "Inline message action buttons for copy, retry, and vote flows.",
      "files": [
        {
          "path": "registry/pixel-ui/ai/message.tsx",
          "type": "registry:ui",
          "target": "@ui/ai/message.tsx"
        }
      ]
    }
  ]
}
```

Item file example:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "actions",
  "type": "registry:ui",
  "title": "Actions",
  "description": "Inline message action buttons for copy, retry, and vote flows.",
  "dependencies": ["lucide-react"],
  "registryDependencies": [],
  "files": [
    {
      "path": "registry/pixel-ui/ai/message.tsx",
      "type": "registry:ui",
      "target": "@ui/ai/message.tsx"
    }
  ]
}
```

Direct install:

```bash
npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/actions.json
```

Namespace install:

```bash
npx shadcn@latest registry add @pixel-ui=https://registry.pixel-ui.amansagar.in/r/{name}.json
npx shadcn@latest add @pixel-ui/actions
```

---

## Registry Structure

```
registry/
├── registry.json           # Registry metadata
├── primitives/
│   ├── planner/
│   │   ├── registry.json
│   │   ├── index.ts
│   │   ├── planner.ts
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   ├── prompt.md
│   │   ├── README.md
│   │   ├── examples.ts
│   │   ├── planner.test.ts
│   │   ├── planner.eval.ts
│   │   └── CHANGELOG.md
│   ├── memory/
│   └── ...
└── templates/
    ├── nextjs/
    ├── express/
    └── ...
```

---

## Registry Metadata

The root `registry.json` contains:

```json
{
  "name": "pixel-ui-registry",
  "version": "1.0.0",
  "description": "Official pixel-ui primitives registry",
  "url": "https://registry.pixel-ui.amansagar.in",
  "primitives": [
    {
      "name": "planner",
      "category": "runtime",
      "version": "1.0.0",
      "description": "Task decomposition and planning",
      "files": ["index.ts", "planner.ts", "types.ts", "schema.ts"],
      "dependencies": [],
      "tags": ["planning", "tasks"],
      "frameworks": ["langchain", "openai", "mastra"]
    }
  ]
}
```

---

## Primitive Metadata

Each primitive has its own `registry.json`:

```json
{
  "name": "planner",
  "category": "runtime",
  "version": "1.0.0",
  "description": "Task decomposition and planning for AI agents",
  "author": "pixel-ui",
  "license": "MIT",
  "files": [
    {
      "name": "index.ts",
      "path": "index.ts",
      "type": "source",
      "description": "Public exports"
    },
    {
      "name": "planner.ts",
      "path": "planner.ts",
      "type": "source",
      "description": "Core implementation"
    },
    {
      "name": "types.ts",
      "path": "types.ts",
      "type": "source",
      "description": "TypeScript types"
    },
    {
      "name": "schema.ts",
      "path": "schema.ts",
      "type": "source",
      "description": "Zod schemas"
    },
    {
      "name": "prompt.md",
      "path": "prompt.md",
      "type": "docs",
      "description": "System prompt"
    },
    {
      "name": "README.md",
      "path": "README.md",
      "type": "docs",
      "description": "Documentation"
    },
    {
      "name": "examples.ts",
      "path": "examples.ts",
      "type": "examples",
      "description": "Usage examples"
    },
    {
      "name": "planner.test.ts",
      "path": "planner.test.ts",
      "type": "test",
      "description": "Unit tests"
    },
    {
      "name": "planner.eval.ts",
      "path": "planner.eval.ts",
      "type": "eval",
      "description": "Evaluation tests"
    }
  ],
  "dependencies": ["zod"],
  "devDependencies": ["vitest"],
  "tags": ["planning", "tasks", "decomposition"],
  "frameworks": ["langchain", "openai", "mastra", "plain"]
}
```

---

## File Types

| Type | Description | Required |
|------|-------------|----------|
| `source` | Implementation code | Yes |
| `types` | TypeScript types | Yes |
| `schema` | Validation schemas | Yes |
| `docs` | Documentation | Yes |
| `examples` | Usage examples | Yes |
| `test` | Unit tests | Yes |
| `eval` | Evaluation tests | Recommended |
| `config` | Configuration files | Optional |

---

## Categories

### Runtime

Primitives that execute logic:

- `planner` - Task decomposition
- `router` - Multi-model routing
- `supervisor` - Orchestration
- `reflection` - Self-improvement
- `retry` - Error handling
- `approval` - Human-in-the-loop

### Memory

Primitives for state management:

- `conversation` - Chat history
- `semantic` - Vector storage
- `knowledge-graph` - Graph database
- `vector-store` - Embedding storage

### Tools

Primitives for external interactions:

- `browser` - Web browsing
- `search` - Web search
- `filesystem` - File operations
- `github` - GitHub API
- `slack` - Slack API
- `notion` - Notion API
- `sql` - Database queries

### Observability

Primitives for monitoring:

- `logger` - Structured logging
- `telemetry` - Metrics collection
- `metrics` - Performance metrics
- `tracing` - Request tracing

### Evaluation

Primitives for quality assurance:

- `hallucination` - Factual accuracy
- `groundedness` - Source verification
- `tool-success` - Tool call success
- `cost` - Cost tracking
- `latency` - Performance tracking

### Security

Primitives for safety:

- `rbac` - Access control
- `secret-manager` - Secret handling
- `sandbox` - Isolation
- `pii-filter` - Data protection
- `guardrails` - Safety checks

### Context Engineering

Primitives for context management:

- `compression` - Context reduction
- `ranking` - Relevance scoring
- `deduplication` - Remove duplicates
- `context-window` - Window optimization

---

## Versioning

Follows Semantic Versioning:

- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

---

## Publishing

### Automated

1. Create PR with primitive
2. CI validates structure
3. CI runs tests
4. CI runs evaluations
5. Review and merge
6. Auto-publish to registry

### Manual

```bash
# Validate primitive
pixel-ui validate ./my-primitive

# Publish to registry
pixel-ui publish ./my-primitive
```

---

## Quality Standards

Every primitive must:

1. **Pass tests** - 90%+ coverage
2. **Pass evaluation** - Meet quality thresholds
3. **Include documentation** - README with examples
4. **Include types** - Full TypeScript support
5. **Include validation** - Zod schemas
6. **Follow conventions** - Consistent structure
7. **Be framework agnostic** - No vendor lock-in
8. **Have no secrets** - Clean code review
