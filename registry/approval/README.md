# Approval Primitive

The approval primitive provides human-in-the-loop approval capabilities for AI agents.

## Installation

```bash
npx agentcn add approval
```

## Usage

```typescript
import { createApprover } from './approval';

const approver = createApprover({ timeout: 300000 });

// Request approval
const request = await approver.request(
  'delete',
  'Delete user account for user@example.com',
  { userId: '123' }
);

// In your UI, show the request and wait for user decision
// Then approve or deny
const response = await approver.approve(request.id, 'User confirmed');

if (response.approved) {
  // Proceed with the action
}
```

## API

### `createApprover(config?: ApprovalConfig)`

Creates a new approver instance.

### `approver.request(action, description, metadata?)`

Creates a new approval request.

### `approver.approve(requestId, reason?)`

Approves the request.

### `approver.deny(requestId, reason?)`

Denies the request.

### `approver.check(requestId)`

Checks the response for a request.

## Configuration

```typescript
interface ApprovalConfig {
  timeout?: number;        // Request timeout in ms (default: 300000)
  defaultApproval?: boolean; // Default if timeout (default: false)
}
```
