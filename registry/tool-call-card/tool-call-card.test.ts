import { describe, expect, it } from 'vitest';
import { ToolCallCardPropsSchema } from './schema';
import {
  createToolCallState,
  getToolCallDurationMs,
  redactToolCallArguments,
  transitionToolCall
} from './use-tool-call';

describe('tool-call-card primitive', () => {
  it('validates a minimal tool call payload', () => {
    const parsed = ToolCallCardPropsSchema.parse({
      id: 'call_1',
      toolName: 'search',
      status: 'pending'
    });

    expect(parsed.arguments).toEqual([]);
    expect(parsed.requiresApproval).toBe(false);
  });

  it('creates normalized state from props', () => {
    const state = createToolCallState({
      id: 'call_1',
      toolName: 'browser.navigate',
      status: 'running',
      startedAt: '2026-07-06T00:00:00.000Z',
      arguments: [{ name: 'url', value: 'https://example.com' }]
    });

    expect(state.toolName).toBe('browser.navigate');
    expect(state.startedAt).toBeInstanceOf(Date);
    expect(state.arguments[0].name).toBe('url');
  });

  it('transitions terminal states with a completion timestamp', () => {
    const state = createToolCallState({
      id: 'call_1',
      toolName: 'search',
      status: 'running'
    });

    const next = transitionToolCall(state, 'success', { summary: 'Found 3 results' });

    expect(next.status).toBe('success');
    expect(next.result?.summary).toBe('Found 3 results');
    expect(next.completedAt).toBeInstanceOf(Date);
  });

  it('redacts sensitive argument values', () => {
    const state = createToolCallState({
      id: 'call_1',
      toolName: 'api.call',
      status: 'pending',
      arguments: [
        { name: 'token', value: 'secret', sensitive: true },
        { name: 'query', value: 'weather' }
      ]
    });

    const redacted = redactToolCallArguments(state);

    expect(redacted.arguments[0].value).toBe('[redacted]');
    expect(redacted.arguments[1].value).toBe('weather');
  });

  it('computes non-negative duration', () => {
    const state = createToolCallState({
      id: 'call_1',
      toolName: 'search',
      status: 'running',
      startedAt: '2026-07-06T00:00:00.000Z'
    });

    const duration = getToolCallDurationMs(state, new Date('2026-07-06T00:00:01.500Z'));

    expect(duration).toBe(1500);
  });
});
