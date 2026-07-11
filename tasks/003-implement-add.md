# Task 003: Implement `agentcn add`

## Objective

Implement the `add` command that downloads and installs primitives.

---

## Acceptance Criteria

- [ ] Fetch primitive from registry
- [ ] Download all primitive files
- [ ] Write files to `primitives/<name>/`
- [ ] Update `agentcn.json`
- [ ] Show progress with spinner
- [ ] Handle errors gracefully
- [ ] Support `--force` flag
- [ ] Support `--registry` flag

---

## Technical Details

### Flow

```
1. Validate primitive name
2. Check if already installed (unless --force)
3. Fetch primitive metadata
4. Download all files
5. Write to primitives/<name>/
6. Update agentcn.json
7. Show success message
```

### Implementation

```typescript
export const addCommand = new Command('add')
  .description('Add a primitive to your project')
  .argument('<primitive>', 'Primitive name to add')
  .option('-y, --yes', 'Skip prompts')
  .option('--registry <url>', 'Registry URL')
  .option('--force', 'Overwrite existing')
  .action(async (primitiveName: string, options) => {
    const spinner = ora(`Adding ${primitiveName}...`).start();

    try {
      // 1. Validate
      // 2. Check existing
      // 3. Fetch metadata
      // 4. Download files
      // 5. Write files
      // 6. Update config
      // 7. Success message
    } catch (error) {
      spinner.fail(chalk.red(`Failed to add ${primitiveName}`));
      process.exit(1);
    }
  });
```

### File Download

```typescript
async function downloadFile(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content);
}
```

---

## Testing

- [ ] Downloads primitive correctly
- [ ] Writes files to correct location
- [ ] Updates config correctly
- [ ] Handles missing primitive
- [ ] Handles network errors
- [ ] Supports force flag

---

## Definition of Done

- [ ] Command implemented
- [ ] Error handling complete
- [ ] Tests passing
- [ ] TypeScript compiles
- [ ] No lint errors

---

## References

- [CLI_SPEC.md](../docs/CLI_SPEC.md)
- [REGISTRY_SPEC.md](../docs/REGISTRY_SPEC.md)
