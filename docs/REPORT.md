# pixel-ui Product Report & Changelog

## Executive Summary

pixel-ui is "the shadcn/ui for AI agent engineering" — an open-source registry of copy-paste AI agent primitives for building production-ready AI agents.

**Unique Value Proposition**: Copy-paste source code model. Developers own the code, no vendor lock-in, framework agnostic.

**Current Status**: 11 primitives implemented, CLI with 7 commands, Next.js 16 docs site, 80 tests passing.

---

## Competitive Analysis

| Competitor | Stars | Language | Best For | Key Differentiator |
|------------|-------|----------|----------|-------------------|
| Vercel AI SDK | 25.3K | TypeScript | Web apps needing AI | Thinnest abstraction, best streaming |
| LangChain | 140K | Python/TS | Full-stack agent platforms | Largest ecosystem, LangSmith platform |
| CrewAI | 54.8K | Python | Enterprise multi-agent | Role-based crews, visual Studio |
| Mastra | 25.8K | TypeScript | TS teams wanting complete stack | Batteries-included, built-in observability |
| OpenAI Agents SDK | 27.5K | Python | OpenAI-native agents | Sandbox execution, minimal abstractions |

**pixel-ui Position**: Copy-paste model (like shadcn/ui) — unique in the market.

---

## Feature Gap Analysis

### Primitives Status

| Category | Implemented | Missing | Status |
|----------|-------------|---------|--------|
| **Runtime** | 5/6 | supervisor | 🟡 Near complete |
| **Memory** | 1/4 | conversation, semantic, knowledge-graph, vector-store | 🔴 Critical gap |
| **Tools** | 1/7 | search, filesystem, github, slack, notion, sql | 🔴 Critical gap |
| **Observability** | 1/4 | logger, metrics, tracing | 🟡 High priority |
| **Evaluation** | 1/5 | hallucination, groundedness, tool-success, cost, latency | 🟡 High priority |
| **Security** | 1/5 | rbac, secret-manager, sandbox, pii-filter, guardrails | 🟡 High priority |
| **Context** | 1/4 | compression, ranking, deduplication, context-window | 🟢 Medium priority |

### Documentation Status

| Area | Status | Priority |
|------|--------|----------|
| Per-primitive docs | ❌ Not implemented | Critical |
| API reference | ❌ Not implemented | Critical |
| Framework guides | ❌ Not implemented | High |
| Examples | ❌ Empty directory | High |
| Troubleshooting | ❌ Not implemented | Medium |

### Developer Experience Status

| Feature | Status | Priority |
|---------|--------|----------|
| Interactive playground | ❌ Static only | High |
| Framework templates | ❌ Placeholder | High |
| Docs search | ❌ Not implemented | Medium |
| CLI validate | ❌ Not built | Medium |
| CLI publish | ❌ Not built | Medium |

### Production Readiness Status

| Feature | Status | Priority |
|---------|--------|----------|
| Eval tests | ❌ 0 files | Critical |
| E2E tests | ❌ Minimal | High |
| Coverage enforcement | ❌ Not in CI | Medium |
| Audit scanning | ❌ Not in CI | Medium |
| Benchmarks | ❌ Not implemented | Medium |

---

## Recommended Roadmap

### Phase 1: Core Primitives (Weeks 1-4)
- [ ] Implement `memory/conversation` primitive
- [ ] Implement `memory/semantic` primitive
- [ ] Implement `tools/search` primitive
- [ ] Implement `tools/filesystem` primitive
- [ ] Create real Browser primitive with Puppeteer
- [ ] Add eval tests for all primitives

### Phase 2: Documentation (Weeks 5-6)
- [ ] Per-primitive documentation pages
- [ ] API reference generation
- [ ] Framework integration guides
- [ ] 3+ working examples

### Phase 3: Developer Experience (Weeks 7-8)
- [ ] Interactive playground with live execution
- [ ] Framework init templates (Next.js, Express)
- [ ] CLI search/validate commands
- [ ] Docs search (Algolia/Pagefind)

### Phase 4: Community (Weeks 9-10)
- [ ] Community publishing workflow
- [ ] GitHub issue/PR templates
- [ ] Discord setup
- [ ] Changelog automation (changesets)

### Phase 5: Production (Weeks 11-12)
- [ ] E2E test suite
- [ ] Coverage enforcement
- [ ] Audit scanning
- [ ] Performance benchmarks

---

## Pricing Strategy

| Model | Recommendation |
|-------|----------------|
| Core primitives | ✅ MIT license (free) |
| Registry hosting | ✅ Freemium (free tier + paid) |
| Enterprise support | ❌ Too early |
| GitHub sponsors | ✅ Community support |

---

## Success Metrics

| Metric | Current | 6-Month | 12-Month |
|--------|---------|---------|----------|
| GitHub Stars | ~0 | 1,000 | 5,000 |
| npm Downloads/week | ~0 | 500 | 5,000 |
| Primitives | 11 | 30 | 40+ |
| Contributors | 1 | 10 | 50 |

---

## Changelog

### v0.1.0 (Current - July 2026)

#### Added
- Monorepo structure with Turborepo
- CLI package with 7 commands (init, add, remove, list, doctor, test, upgrade)
- Registry SDK (RegistryClient, ConfigManager, CacheManager)
- Core package (types, schemas, validators)
- SDK package with factory functions
- 11 primitives implemented:
  - Runtime: planner, reflection, retry, approval, router
  - Memory: memory
  - Tools: browser
  - Observability: telemetry
  - Evaluation: evaluator
  - Security: security
  - Context: context
- Next.js 16 docs site with Vercel-style design
- GitHub Actions CI/CD pipeline
- 80 tests passing
- Scroll progress indicator
- Table of contents (right sidebar)
- Framework integration cards

#### Changed
- Renamed from AgentCN to pixel-ui
- Updated all typography to match Vercel SDK docs style
- Improved sidebar navigation with sticky positioning

#### Fixed
- Sidebar scrolling with content (now sticky)
- Homepage centering
- Layout consistency across all pages

---

### v0.2.0 (Planned - Week 1-4)

#### Will Add
- `memory/conversation` primitive
- `memory/semantic` primitive
- `tools/search` primitive
- `tools/filesystem` primitive
- Real Browser primitive with Puppeteer
- Eval tests for all primitives

---

### v0.3.0 (Planned - Week 5-6)

#### Will Add
- Per-primitive documentation pages
- API reference generation
- Framework integration guides
- Working examples

---

### v0.4.0 (Planned - Week 7-8)

#### Will Add
- Interactive playground
- Framework init templates
- CLI search/validate commands
- Docs search

---

### v0.5.0 (Planned - Week 9-12)

#### Will Add
- Community publishing workflow
- GitHub templates
- E2E test suite
- Coverage enforcement
- Performance benchmarks

---

## Key Risks

| Risk | Mitigation |
|------|------------|
| Competitors release similar model | Move fast, build community |
| Quality inconsistencies | Strict review process, eval tests |
| Low adoption | Focus on core primitives first |
| Maintainer burnout | Automate, delegate, community |

---

## Next Immediate Actions

1. **Implement Memory primitives** (conversation, semantic)
2. **Implement Tool primitives** (search, filesystem)
3. **Create per-primitive docs**
4. **Add eval tests**
5. **Set up Discord community**
