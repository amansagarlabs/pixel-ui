# Browser Primitive

The browser primitive provides web browsing and interaction capabilities for AI agents.

## Installation

```bash
npx agentcn add browser
```

## Usage

```typescript
import { createBrowser } from './browser';

const browser = createBrowser({
  headless: true,
  timeout: 30000
});

// Navigate to a URL
const page = await browser.navigate('https://example.com');
console.log(page.title);

// Click an element
await browser.click('#submit-button');

// Fill a form
await browser.fill('#email', 'user@example.com');

// Take a screenshot
const screenshot = await browser.screenshot();

// Close the browser
await browser.close();
```

## API

### `createBrowser(config?: BrowserConfig)`

Creates a new browser instance.

### `browser.navigate(url)`

Navigates to the specified URL and returns page information.

### `browser.click(selector)`

Clicks an element matching the selector.

### `browser.fill(selector, value)`

Fills an input field with the specified value.

### `browser.submit(selector)`

Submits a form matching the selector.

### `browser.getContent()`

Returns the current page content.

### `browser.screenshot()`

Takes a screenshot of the current page.

### `browser.close()`

Closes the browser instance.

## Configuration

```typescript
interface BrowserConfig {
  headless?: boolean;  // Run in headless mode (default: true)
  timeout?: number;    // Navigation timeout in ms (default: 30000)
  userAgent?: string;  // Custom user agent
}
```

## Examples

See [examples.ts](./examples.ts) for more usage examples.
