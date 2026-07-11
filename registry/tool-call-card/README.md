# tool-call-card

`tool-call-card` renders a compact, auditable tool execution surface for AI agents.

It is designed for agent traces, tool approval flows, and live execution logs where users need to see what tool ran, which arguments were used, and whether the call is pending, running, successful, or failed.

## Files

- `tool-call-card.tsx` - UI component for the tool call surface.
- `use-tool-call.ts` - state helpers for normalizing, redacting, transitioning, and timing tool calls.
- `schema.ts` - Zod schemas for props, state, status, arguments, and result payloads.

## Install

```bash
npx pixel-ui add tool-call-card
```

## Usage

```tsx
import { ToolCallCard } from './tool-call-card';

export function TraceItem() {
  return (
    <ToolCallCard
      id="call_1"
      toolName="browser.navigate"
      status="running"
      arguments={[{ name: 'url', value: 'https://example.com' }]}
    />
  );
}
```

## States

- `pending` - queued but not started.
- `running` - currently executing.
- `success` - completed with output.
- `error` - failed with an error message.
