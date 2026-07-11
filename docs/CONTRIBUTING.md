# Contributing to pixel-ui

Thank you for your interest in contributing to pixel-ui!

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/pixel-ui/pixel-ui.git
cd pixel-ui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

---

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

Follow the code style and conventions.

### 3. Write Tests

Every change should include tests.

### 4. Run Checks

```bash
pnpm typecheck
pnpm lint
pnpm test
```

### 5. Submit PR

- Fill out PR template
- Link related issues
- Request review

---

## Code Style

### TypeScript

- Use strict TypeScript
- Prefer interfaces over types
- Use Zod for validation
- Export types explicitly

### Naming

- Files: `kebab-case.ts`
- Types: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Structure

```typescript
// Imports
import { z } from 'zod';

// Schemas
export const MySchema = z.object({});

// Types
export type MyType = z.infer<typeof MySchema>;

// Implementation
export function myFunction(): MyType {
  // ...
}
```

---

## Primitive Development

### Creating a New Primitive

1. Create directory: `registry/<name>/`
2. Add required files:
   - `registry.json`
   - `index.ts`
   - `<name>.ts`
   - `types.ts`
   - `schema.ts`
   - `prompt.md`
   - `README.md`
   - `examples.ts`
   - `<name>.test.ts`
   - `<name>.eval.ts`
   - `CHANGELOG.md`

3. Follow the structure in `docs/REGISTRY_SPEC.md`

### Testing

- Unit tests: `<name>.test.ts`
- Evaluation tests: `<name>.eval.ts`
- Aim for 90%+ coverage

### Documentation

- README with installation, usage, API
- Examples for common use cases
- Prompt engineering documentation

---

## Commit Messages

Follow Conventional Commits:

```
feat: add planner primitive
fix: resolve memory leak
docs: update README
test: add browser tests
refactor: simplify evaluator
```

---

## Pull Request Process

1. Fill out PR template
2. Ensure CI passes
3. Request review from maintainers
4. Address feedback
5. Merge when approved

### PR Template

```markdown
## Description

Brief description of changes.

## Type

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

### Enforcement

Instances of abusive behavior can be reported to the project team.

---

## Questions?

- Open an issue
- Start a discussion
- Join our Discord
