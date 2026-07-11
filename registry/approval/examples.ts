import { createApprover } from './approval';

async function basicApproval() {
  const approver = createApprover();
  
  const request = await approver.request(
    'send-email',
    'Send email to user@example.com',
    { to: 'user@example.com', subject: 'Hello' }
  );
  
  console.log('Approval request created:', request.id);
  
  // In real app, wait for user to approve/deny in UI
  const response = await approver.approve(request.id, 'Looks good');
  console.log('Approval response:', response);
}

async function checkApproval() {
  const approver = createApprover();
  
  const request = await approver.request('delete', 'Delete record');
  const response = await approver.check(request.id);
  
  if (response === null) {
    console.log('Awaiting approval');
  } else if (response.approved) {
    console.log('Approved');
  } else {
    console.log('Denied:', response.reason);
  }
}

export { basicApproval, checkApproval };
