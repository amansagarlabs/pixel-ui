import { createRetryer } from './retry';

async function basicRetry() {
  const retryer = createRetryer({ maxRetries: 3 });
  
  const result = await retryer.execute(async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error(`${response.status}`);
    return response.json();
  });
  
  console.log('Result:', result);
}

async function customRetryableErrors() {
  const retryer = createRetryer({
    maxRetries: 5,
    retryableErrors: ['ECONNRESET', 'ETIMEDOUT', '429', '500', '502', '503']
  });
  
  const result = await retryer.execute(async () => {
    // Your API call here
  });
}

export { basicRetry, customRetryableErrors };
