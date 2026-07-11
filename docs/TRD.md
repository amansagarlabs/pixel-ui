# Technical Requirements Document

## Project

**pixel-ui**

**Tagline**

> The shadcn/ui for AI Agent Engineering.

---

## Vision

pixel-ui is an open-source registry of production-ready AI agent primitives.

Instead of installing an opinionated framework, developers install **copy-paste source code** for planners, memory, evaluators, browser tools, guardrails, and workflows that they fully own.

Inspired by:

- shadcn/ui
- AI Elements
- Vercel AI SDK

But focused on **runtime engineering** instead of UI.

---

## Problem Statement

Today's AI ecosystem has:

- ✅ Great UI libraries
- ✅ Great orchestration frameworks

But lacks:

- Reusable runtime primitives
- Standard project architecture
- Installable production modules
- Testing
- Evaluation
- Observability
- Security defaults

Developers repeatedly rewrite the same functionality.

---

## Goals

### Primary

Become the standard registry for AI agent primitives.

### Secondary

Become compatible with every framework:

- LangGraph
- OpenAI Agents SDK
- CrewAI
- Mastra
- Plain TypeScript

No vendor lock-in.

---

## Non Goals

- ❌ Build another orchestration framework
- ❌ Replace LangGraph
- ❌ Replace AI SDK
- ❌ Replace MCP

---

## Core Principles

### Copy Source

Never hide implementation.

Everything belongs to the developer.

Like shadcn.

### Framework Agnostic

Works anywhere.

### Type Safe

Strict TypeScript.

### Production First

Every primitive includes:

- Tests
- Documentation
- Evaluation
- Telemetry
- Examples

---

## High Level Architecture

```
CLI
  ↓
Registry
  ↓
Templates
  ↓
Generator
  ↓
User Project
  ↓
Developer Owns Code
```

---

## Folder Structure

```
apps/
  docs
  registry
  playground

packages/
  cli
  core
  registry-sdk
  generator
  shared

registry/
  planner
  memory
  reflection
  browser
  retry
  approval
  telemetry
  evaluator
  router
  security
  context

templates/
  nextjs
  express
  hono
  fastify

examples/
```

---

## Registry Item Structure

Every primitive follows the same layout:

```
planner/
  registry.json
  index.ts
  planner.ts
  types.ts
  schema.ts
  README.md
  prompt.md
  examples.ts
  planner.test.ts
  planner.eval.ts
  CHANGELOG.md
```

---

## CLI Commands

```bash
pixel-ui init
pixel-ui add planner
pixel-ui add browser
pixel-ui add memory
pixel-ui add evaluator
pixel-ui add reflection
pixel-ui remove planner
pixel-ui list
pixel-ui doctor
pixel-ui test
pixel-ui upgrade
```

---

## Registry Format

```json
{
  "name": "planner",
  "category": "primitive",
  "version": "1.0.0",
  "dependencies": [],
  "files": [],
  "examples": [],
  "tags": [],
  "frameworks": []
}
```

---

## Categories

### Runtime

- Planner
- Router
- Supervisor
- Reflection
- Retry
- Approval

### Memory

- Conversation
- Semantic
- Knowledge Graph
- Vector Store

### Tools

- Browser
- Search
- Filesystem
- GitHub
- Slack
- Notion
- SQL

### Observability

- Logger
- Telemetry
- Metrics
- Tracing

### Evaluation

- Hallucination
- Groundedness
- Tool Success
- Cost
- Latency

### Security

- RBAC
- Secret Manager
- Sandbox
- PII Filter
- Guardrails

### Context Engineering

- Compression
- Ranking
- Deduplication
- Context Window Optimizer

---

## Agent Doctor

One unique feature:

```bash
pixel-ui doctor
```

Checks:

- Missing retries
- Prompt size
- Missing telemetry
- Missing tests
- Recursion risks
- Context overflow
- Approval gates
- Security issues

Think of it as **ESLint + Lighthouse + npm audit** for AI agents.

---

## Documentation

Every registry item automatically includes:

- Installation
- Architecture
- Examples
- Tests
- Evaluation
- Customization
- Benchmarks

---

## Technology Stack

| Layer           | Technology            |
| --------------- | --------------------- |
| Language        | TypeScript            |
| Runtime         | Node.js + Bun support |
| CLI             | Commander or CAC      |
| Package Manager | pnpm                  |
| Validation      | Zod                   |
| Registry        | JSON + Git            |
| Docs            | Next.js + MDX         |
| Testing         | Vitest                |
| Linting         | ESLint                |
| Formatting      | Prettier              |

---

## Success Metrics

### Technical

- Install time < 5 seconds
- Zero runtime dependencies for generated code where practical
- 90%+ test coverage on registry items
- Stable versioned registry

### Community

- 100+ primitives
- 1,000+ GitHub stars
- 50+ contributors
- Framework integrations
- Community registry submissions
