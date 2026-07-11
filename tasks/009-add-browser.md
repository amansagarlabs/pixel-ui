# Task 009: Add Browser Primitive

## Objective

Create the browser primitive for web browsing and interaction.

---

## Acceptance Criteria

- [ ] Create browser directory structure
- [ ] Implement core browser logic
- [ ] Define TypeScript types
- [ ] Add Zod schemas
- [ ] Write system prompt
- [ ] Create documentation
- [ ] Add usage examples
- [ ] Write unit tests
- [ ] Write evaluation tests
- [ ] Add to registry

---

## Technical Details

### Directory Structure

```
registry/browser/
├── registry.json
├── index.ts
├── browser.ts
├── types.ts
├── schema.ts
├── prompt.md
├── README.md
├── examples.ts
├── browser.test.ts
├── browser.eval.ts
└── CHANGELOG.md
```

### Types

```typescript
export interface BrowserConfig {
  headless?: boolean;
  timeout?: number;
  userAgent?: string;
}

export interface Page {
  url: string;
  title: string;
  content: string;
  links: Link[];
  forms: Form[];
}

export interface Link {
  text: string;
  href: string;
}

export interface Form {
  action: string;
  method: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  type: string;
  value?: string;
}

export interface Browser {
  navigate(url: string): Promise<Page>;
  click(selector: string): Promise<void>;
  fill(selector: string, value: string): Promise<void>;
  submit(selector: string): Promise<void>;
  getContent(): Promise<string>;
  screenshot(): Promise<Buffer>;
  close(): Promise<void>;
}
```

### Implementation

```typescript
export function createBrowser(config: BrowserConfig = {}): Browser {
  // In real implementation, this would use Puppeteer or Playwright
  return {
    async navigate(url: string): Promise<Page> {
      // Navigate to URL
      // Extract page content
      // Return Page object
    },

    async click(selector: string): Promise<void> {
      // Click element
    },

    async fill(selector: string, value: string): Promise<void> {
      // Fill input field
    },

    async submit(selector: string): Promise<void> {
      // Submit form
    },

    async getContent(): Promise<string> {
      // Get page content
    },

    async screenshot(): Promise<Buffer> {
      // Take screenshot
    },

    async close(): Promise<void> {
      // Close browser
    }
  };
}
```

---

## Testing

- [ ] Navigates to URL
- [ ] Clicks elements
- [ ] Fills forms
- [ ] Takes screenshots
- [ ] Handles errors

---

## Definition of Done

- [ ] All files created
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Added to registry

---

## References

- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
