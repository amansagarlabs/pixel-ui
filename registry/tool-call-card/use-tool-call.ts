import { ToolCallCardPropsSchema, ToolCallStateSchema } from './schema';
import type { ToolCallCardProps, ToolCallResult, ToolCallState, ToolCallStatus } from './types';

function toDate(value: string | Date | undefined, fallback: Date): Date {
  if (!value) return fallback;
  return value instanceof Date ? value : new Date(value);
}

export function createToolCallState(props: ToolCallCardProps): ToolCallState {
  const parsed = ToolCallCardPropsSchema.parse(props);
  const now = new Date();

  return ToolCallStateSchema.parse({
    id: parsed.id,
    toolName: parsed.toolName,
    status: parsed.status,
    arguments: parsed.arguments,
    result: parsed.result,
    startedAt: toDate(parsed.startedAt, now),
    completedAt: parsed.completedAt ? toDate(parsed.completedAt, now) : undefined
  });
}

export function transitionToolCall(
  state: ToolCallState,
  status: ToolCallStatus,
  result?: ToolCallResult
): ToolCallState {
  const nextState: ToolCallState = {
    ...state,
    status,
    result: result ?? state.result,
    completedAt: status === 'success' || status === 'error' ? new Date() : state.completedAt
  };

  return ToolCallStateSchema.parse(nextState);
}

export function getToolCallDurationMs(state: ToolCallState, now: Date = new Date()): number {
  const end = state.completedAt ?? now;
  return Math.max(0, end.getTime() - state.startedAt.getTime());
}

export function redactToolCallArguments(state: ToolCallState): ToolCallState {
  return {
    ...state,
    arguments: state.arguments.map(argument => ({
      ...argument,
      value: argument.sensitive ? '[redacted]' : argument.value
    }))
  };
}
