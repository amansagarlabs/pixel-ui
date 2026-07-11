# Codex Build Prompt

```text
Build pixel-ui: a shadcn-style primitive registry for AI agent UI.

Positioning:
- Not a generic component library.
- A source registry for agent primitives installed like `npx pixel-ui add planner`.
- Every primitive ships as UI + hook/adapter + Zod schema.

Stack:
- pnpm/npm monorepo, Next.js, TypeScript, Tailwind, shadcn/ui, Radix/Base UI, Zod, Zustand, Motion.
- Use Fumadocs-style docs: MDX, code examples, and live previews.
- Use TanStack Query/Table where registry pages need data fetching or dense tables.

Structure:
- `apps/docs`: docs, registry pages, live previews.
- `packages/cli`: `pixel-ui add <name>` command that reads registry metadata, copies files, and installs dependencies.
- `packages/core`: shared hooks such as `useAgentStream`, `useToolCall`, `useTrace`.
- `packages/schemas`: shared Zod schemas.
- `registry`: primitive source, tests, examples, prompts, and registry metadata.

Registry entry shape:
```json
{
  "name": "tool-call-card",
  "type": "agent:primitive",
  "category": "tools",
  "dependencies": ["zod"],
  "files": ["tool-call-card.tsx", "tool-call-card.schema.ts", "use-tool-call.ts"]
}
```

Primitive categories:
- Reasoning: planner, step-tracer, evaluator.
- Memory: memory-recall-card, session-summary-panel.
- Tools: tool-call-card, function-schema-inspector, browser-action-viewer.
- I/O: streaming-chat-bubble, structured-output-renderer, agent-canvas.
- Guardrails: confirmation-gate, cost-token-meter, approval-card.

Design:
- Quiet dark UI, mono accents, generous whitespace, one accent color.
- Motion only for state changes: pending, success, error, streaming, step-complete.
- No decorative animation inside agent work surfaces.
- Use shadcn/Radix primitives for accessibility and focus behavior.

Start:
1. Audit the existing repo before scaffolding anything new.
2. Align `registry/registry.json` entries to the agent primitive schema.
3. Scaffold `tool-call-card` end to end as the reference primitive:
   - component
   - hook
   - Zod schema
   - tests
   - registry entry
   - docs preview
4. Then scaffold `streaming-chat-bubble`, `memory-recall-card`, `confirmation-gate`, and `trace-viewer` using the same pattern.
5. Run typecheck, tests, and docs build.
```
