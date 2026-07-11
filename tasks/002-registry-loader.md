# Task 002: Registry Loader

## Objective

Build the registry client that can fetch and cache primitive metadata.

---

## Acceptance Criteria

- [ ] Create `RegistryClient` class
- [ ] Fetch primitive metadata from registry
- [ ] Cache responses locally
- [ ] Validate metadata with Zod
- [ ] Handle network errors gracefully
- [ ] Support custom registry URLs

---

## Technical Details

### Package Structure

```
packages/registry/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── client.ts        # RegistryClient
│   ├── config.ts        # ConfigManager
│   ├── cache.ts         # CacheManager
│   └── types.ts         # Type definitions
```

### RegistryClient

```typescript
export class RegistryClient {
  private baseUrl: string;
  private cacheDir: string;

  constructor(config: { url: string; cacheDir?: string }) {
    this.baseUrl = config.url;
    this.cacheDir = config.cacheDir || '.agentcn-cache';
  }

  async getPrimitive(name: string): Promise<PrimitiveMetadata> {
    // Check cache first
    // Fetch from registry if not cached
    // Validate response
    // Cache result
    // Return metadata
  }

  async listPrimitives(): Promise<string[]> {
    // Fetch list from registry
    // Return primitive names
  }

  async clearCache(): Promise<void> {
    // Clear local cache
  }
}
```

### ConfigManager

```typescript
export class ConfigManager {
  private configPath: string;

  constructor(projectDir?: string) {
    this.configPath = path.join(projectDir || process.cwd(), 'agentcn.json');
  }

  async load(): Promise<Config> {
    // Read and validate agentcn.json
  }

  async save(config: Config): Promise<void> {
    // Write agentcn.json
  }

  async addPrimitive(name: string): Promise<void> {
    // Add primitive to config
  }

  async removePrimitive(name: string): Promise<void> {
    // Remove primitive from config
  }
}
```

### CacheManager

```typescript
export class CacheManager {
  private cacheDir: string;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
  }

  async get(key: string): Promise<unknown | null> {
    // Get from cache
  }

  async set(key: string, value: unknown): Promise<void> {
    // Set in cache
  }

  async has(key: string): Promise<boolean> {
    // Check if key exists
  }

  async clear(): Promise<void> {
    // Clear all cache
  }
}
```

---

## Testing

- [ ] Client fetches metadata correctly
- [ ] Cache works as expected
- [ ] Network errors handled
- [ ] Config reads/writes correctly

---

## Definition of Done

- [ ] All classes implemented
- [ ] Types defined
- [ ] Tests passing
- [ ] TypeScript compiles
- [ ] No lint errors

---

## References

- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
- [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
