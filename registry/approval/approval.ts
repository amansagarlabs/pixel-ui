import { randomUUID } from 'crypto';
import { ApprovalRequestSchema, ApprovalResponseSchema, ApprovalConfigSchema } from './schema';
import type { ApprovalRequest, ApprovalResponse, ApprovalConfig, Approver } from './types';

export function createApprover(config: ApprovalConfig = {}): Approver {
  const validatedConfig = ApprovalConfigSchema.parse(config);
  const pendingRequests: Map<string, ApprovalRequest> = new Map();
  const responses: Map<string, ApprovalResponse> = new Map();

  return {
    async request(action: string, description: string, metadata: Record<string, unknown> = {}): Promise<ApprovalRequest> {
      const request = ApprovalRequestSchema.parse({
        id: randomUUID(),
        action,
        description,
        metadata,
        timestamp: new Date()
      });

      pendingRequests.set(request.id, request);
      return request;
    },

    async approve(requestId: string, reason?: string): Promise<ApprovalResponse> {
      const request = pendingRequests.get(requestId);
      if (!request) {
        throw new Error(`Request ${requestId} not found`);
      }

      const response = ApprovalResponseSchema.parse({
        requestId,
        approved: true,
        reason,
        timestamp: new Date()
      });

      responses.set(requestId, response);
      pendingRequests.delete(requestId);
      return response;
    },

    async deny(requestId: string, reason?: string): Promise<ApprovalResponse> {
      const request = pendingRequests.get(requestId);
      if (!request) {
        throw new Error(`Request ${requestId} not found`);
      }

      const response = ApprovalResponseSchema.parse({
        requestId,
        approved: false,
        reason,
        timestamp: new Date()
      });

      responses.set(requestId, response);
      pendingRequests.delete(requestId);
      return response;
    },

    async check(requestId: string): Promise<ApprovalResponse | null> {
      return responses.get(requestId) || null;
    }
  };
}
