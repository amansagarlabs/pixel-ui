import { describe, it, expect } from 'vitest';
import { createApprover } from './approval';

describe('createApprover', () => {
  it('should create an approver', () => {
    const approver = createApprover();
    expect(approver).toBeDefined();
  });

  it('should create approval request', async () => {
    const approver = createApprover();
    const request = await approver.request('delete', 'Delete user account');
    
    expect(request.id).toBeDefined();
    expect(request.action).toBe('delete');
  });

  it('should approve request', async () => {
    const approver = createApprover();
    const request = await approver.request('delete', 'Delete user account');
    const response = await approver.approve(request.id, 'Confirmed');
    
    expect(response.approved).toBe(true);
    expect(response.reason).toBe('Confirmed');
  });

  it('should deny request', async () => {
    const approver = createApprover();
    const request = await approver.request('delete', 'Delete user account');
    const response = await approver.deny(request.id, 'Not authorized');
    
    expect(response.approved).toBe(false);
  });

  it('should check response', async () => {
    const approver = createApprover();
    const request = await approver.request('delete', 'Delete user account');
    await approver.approve(request.id);
    
    const response = await approver.check(request.id);
    expect(response?.approved).toBe(true);
  });
});
