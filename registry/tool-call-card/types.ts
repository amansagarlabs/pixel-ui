export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

export interface ToolCallArgument {
  name: string;
  value: unknown;
  sensitive?: boolean;
}

export interface ToolCallResult {
  output?: unknown;
  summary?: string;
  error?: string;
}

export interface ToolCallCardProps {
  id: string;
  toolName: string;
  status: ToolCallStatus;
  arguments?: ToolCallArgument[];
  result?: ToolCallResult;
  startedAt?: string | Date;
  completedAt?: string | Date;
  requiresApproval?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export interface ToolCallState {
  id: string;
  toolName: string;
  status: ToolCallStatus;
  arguments: ToolCallArgument[];
  result?: ToolCallResult;
  startedAt: Date;
  completedAt?: Date;
}
