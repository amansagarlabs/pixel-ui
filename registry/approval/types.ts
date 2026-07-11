export interface ApprovalRequest {
  id: string;
  action: string;
  description: string;
  metadata: Record<string, unknown>;
  timestamp: Date;
}

export interface ApprovalResponse {
  requestId: string;
  approved: boolean;
  reason?: string;
  timestamp: Date;
}

export interface ApprovalConfig {
  timeout?: number;
  defaultApproval?: boolean;
}

export interface Approver {
  request(action: string, description: string, metadata?: Record<string, unknown>): Promise<ApprovalRequest>;
  approve(requestId: string, reason?: string): Promise<ApprovalResponse>;
  deny(requestId: string, reason?: string): Promise<ApprovalResponse>;
  check(requestId: string): Promise<ApprovalResponse | null>;
}
