# pixel-ui

pixel-ui is a shadcn-style primitive registry for AI agents.

It is not a closed component library. Each primitive is source you copy into your app, with a UI surface, a runtime hook or adapter, and a Zod schema that describes the primitive's inputs and outputs.

## Quick Start

```bash
npx pixel-ui init
npx pixel-ui add planner
npx pixel-ui add memory
npx pixel-ui add browser
```

## Primitive Shape

Every primitive is designed to ship as implementation-ready source:

- `component` - the UI surface, such as a planner panel, tool-call card, or trace viewer.
- `hook` - local state and adapter logic for agent runtimes.
- `schema` - Zod contracts for props, events, and structured output.

Example registry entry:

```json
{
  "name": "planner",
  "type": "agent:primitive",
  "category": "reasoning",
  "dependencies": ["zod"],
  "files": ["planner.tsx", "planner.schema.ts", "use-planner.ts"]
}
```

## Current Primitives

- `planner` - task decomposition and planning.
- `memory` - short-term and long-term memory surfaces.
- `browser` - web browsing and interaction primitives.
- `evaluator` - output evaluation and scoring.
- `reflection` - self-review and improvement loops.
- `retry` - retry logic with exponential backoff.
- `approval` - human-in-the-loop approval flows.
- `router` - model and workflow routing.
- `telemetry` - logging and monitoring.
- `security` - guardrails and safety utilities.
- `context` - context window optimization.

## Architecture

- `apps/docs` - documentation and registry previews.
- `packages/cli` - CLI commands for installing primitives.
- `packages/core` - shared utilities and contracts.
- `packages/registry-sdk` - registry client and config helpers.
- `packages/sdk` - factory functions for primitives.
- `registry` - primitive source, schemas, prompts, tests, and metadata.

## License

MIT
