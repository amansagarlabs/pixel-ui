import type { ToolCallCardProps, ToolCallStatus } from './types';
import { createToolCallState, getToolCallDurationMs, redactToolCallArguments } from './use-tool-call';

const statusLabel: Record<ToolCallStatus, string> = {
  pending: 'Pending',
  running: 'Running',
  success: 'Complete',
  error: 'Failed'
};

const statusClassName: Record<ToolCallStatus, string> = {
  pending: 'bg-muted text-muted-foreground',
  running: 'bg-blue-500/10 text-blue-500',
  success: 'bg-emerald-500/10 text-emerald-500',
  error: 'bg-destructive/10 text-destructive'
};

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value;
  return JSON.stringify(value, null, 2);
}

export function ToolCallCard(props: ToolCallCardProps) {
  const state = redactToolCallArguments(createToolCallState(props));
  const durationMs = getToolCallDurationMs(state);

  return (
    <section className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="font-mono text-xs text-muted-foreground">tool call</p>
          <h3 className="mt-1 text-sm font-medium">{state.toolName}</h3>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClassName[state.status]}`}>
          {statusLabel[state.status]}
        </span>
      </header>

      <div className="space-y-4 px-4 py-3">
        {state.arguments.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Arguments</p>
            <dl className="space-y-2">
              {state.arguments.map(argument => (
                <div key={argument.name} className="rounded-md bg-muted/50 px-3 py-2">
                  <dt className="font-mono text-xs text-muted-foreground">{argument.name}</dt>
                  <dd className="mt-1 overflow-x-auto whitespace-pre-wrap font-mono text-xs">
                    {formatValue(argument.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {state.result?.summary || state.result?.error ? (
          <div className="rounded-md border border-border px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Result</p>
            <p className="mt-1 text-sm">{state.result.error ?? state.result.summary}</p>
          </div>
        ) : null}

        <footer className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{durationMs}ms</span>
          {props.requiresApproval ? (
            <div className="flex gap-2">
              <button
                className="rounded-md border border-border px-2 py-1 text-foreground transition-colors hover:bg-muted"
                onClick={() => props.onReject?.(state.id)}
                type="button"
              >
                Reject
              </button>
              <button
                className="rounded-md bg-primary px-2 py-1 text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => props.onApprove?.(state.id)}
                type="button"
              >
                Approve
              </button>
            </div>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
