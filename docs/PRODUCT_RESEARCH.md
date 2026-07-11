# pixel-ui Product Research Report

## Executive Summary

pixel-ui is positioned as "the shadcn/ui for AI agent engineering" — an open-source registry of copy-paste AI agent primitives. After analyzing competitors (Vercel AI SDK, LangChain, CrewAI, Mastra, OpenAI Agents SDK) and auditing the current codebase, we identified **critical gaps** that must be addressed before public launch.

**Current State**: 11/40+ primitives implemented (27%), basic docs, placeholder playground, no community features.

---

## 1. Competitive Landscape

| Competitor | Stars | Language | Best For | Key Differentiator |
|------------|-------|----------|----------|-------------------|
| Vercel AI SDK | 25.3K | TypeScript | Web apps needing AI | Thinnest abstraction, best streaming |
| LangChain | 140K | Python/TS | Full-stack agent platforms | Largest ecosystem, LangSmith platform |
| CrewAI | 54.8K | Python | Enterprise multi-agent | Role-based crews, visual Studio |
| Mastra | 25.8K | TypeScript | TS teams wanting complete stack | Batteries-included, built-in observability |
| OpenAI Agents SDK | 27.5K | Python | OpenAI-native agents | Sandbox execution, minimal abstractions |

**pixel-ui Differentiator**: Copy-paste source model (like shadcn/ui) — developers own the code, no vendor lock-in.

---

## 2. Critical Gaps (Must Fix Before Launch)

### 2.1 Incomplete Primitives

| Category | Implemented | Missing | Priority |
|----------|-------------|---------|----------|
| Runtime | 5/6 | supervisor | Medium |
| Memory | 1/4 | conversation, semantic, knowledge-graph, vector-store | **Critical** |
| Tools | 1/7 | search, filesystem, github, slack, notion, sql | **Critical** |
| Observability | 1/4 | logger, metrics, tracing | High |
| Evaluation | 1/5 | hallucination, groundedness, tool-success, cost, latency | High |
| Security | 1/5 | rbac, secret-manager, sandbox, pii-filter, guardrails | High |
| Context | 1/4 | compression, ranking, deduplication, context-window | Medium |

**Impact**: Without Memory and Tools, pixel-ui cannot compete as a complete agent framework.

### 2.2 Placeholder Implementations

| Primitive | Issue |
|-----------|-------|
| Browser | Returns hardcoded strings, no Puppeteer/Playwright |
| Telemetry | `flush()` is no-op, no real export |
| All primitives | No eval tests (`*.eval.ts`) required by CONTRIBUTING.md |

### 2.3 Documentation Deficiencies

- No per-primitive documentation pages
- No API reference
- No framework integration guides (Next.js, LangGraph, OpenAI SDK)
- Empty `examples/` directory
- No troubleshooting guides
- No prompt engineering guide

---

## 3. High-Priority Gaps

### 3.1 Developer Experience

| Feature | Status | Impact |
|---------|--------|--------|
| Interactive playground | Static code only | High — no way to test primitives live |
| Framework templates | Placeholder only | High — no quick-start for specific frameworks |
| Docs search | Not implemented | Medium — hard to find information |
| CLI validate command | Referenced but not built | Medium |
| CLI publish command | Referenced but not built | Medium |
| Upgrade diff view | Not implemented | Low |

### 3.2 Community & Ecosystem

| Feature | Status | Impact |
|---------|--------|--------|
| Community publishing workflow | Not implemented | High — no external contributions |
| GitHub issue/PR templates | Not created | Medium |
| Discord/community links | Missing | Medium |
| Changelog automation | Manual only | Low |
| Release automation | Not configured | Medium |

### 3.3 Production Readiness

| Feature | Status | Impact |
|---------|--------|--------|
| Eval tests | 0 files | Critical |
| E2E tests | Minimal | High |
| Coverage enforcement | Not in CI | Medium |
| Audit scanning | Not in CI | Medium |
| Performance benchmarks | Not implemented | Medium |
| Structured error types | Not implemented | Medium |

---

## 4. Recommended Roadmap

### Phase 1: Core Primitives (Weeks 1-4)
- Implement Memory primitives (conversation, semantic)
- Implement Tool primitives (search, filesystem)
- Create real Browser primitive with Puppeteer
- Add eval tests for all primitives

### Phase 2: Documentation (Weeks 5-6)
- Per-primitive documentation pages
- API reference generation
- Framework integration guides
- 3+ working examples

### Phase 3: Developer Experience (Weeks 7-8)
- Interactive playground with live execution
- Framework init templates (Next.js, Express)
- CLI search/validate commands
- Docs search (Algolia/Pagefind)

### Phase 4: Community (Weeks 9-10)
- Community publishing workflow
- GitHub templates
- Discord setup
- Changelog automation (changesets)

### Phase 5: Production (Weeks 11-12)
- E2E test suite
- Coverage enforcement
- Audit scanning
- Performance benchmarks

---

## 5. Pricing Strategy

Based on competitor analysis:

| Model | Pros | Cons | Recommendation |
|-------|------|------|----------------|
| Fully free (MIT) | Maximum adoption | No revenue | ✅ Core primitives |
| Freemium (free + paid cloud) | Balances adoption/revenue | Requires cloud infra | ✅ Registry hosting |
| Enterprise support | High-margin revenue | Requires support team | ❌ Too early |
| Sponsorship | Community goodwill | Unpredictable | ✅ GitHub sponsors |

**Recommended**: Keep primitives MIT-licensed. Offer premium registry hosting, enterprise support, and managed deployment as paid tiers.

---

## 6. Success Metrics

| Metric | Current | 6-Month Target | 12-Month Target |
|--------|---------|----------------|-----------------|
| GitHub Stars | ~0 | 1,000 | 5,000 |
| npm Weekly Downloads | ~0 | 500 | 5,000 |
| Primitives Implemented | 11 | 30 | 40+ |
| Contributors | 1 | 10 | 50 |
| Community Members | 0 | 100 | 1,000 |

---

## 7. Key Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Competitors release similar copy-paste model | Medium | High | Move fast, build community |
| Primitive quality inconsistencies | High | Medium | Strict review process, eval tests |
| Low adoption due to incomplete primitives | High | High | Focus on core primitives first |
| Maintainer burnout | Medium | High | Automate, delegate, community |

---

## 8. Conclusion

pixel-ui has a strong differentiator (copy-paste model) but is 6-12 weeks behind competitors in completeness. The critical path is:

1. **Implement Memory + Tools primitives** (without these, no one can build agents)
2. **Create real documentation** (primitives without docs are invisible)
3. **Build interactive playground** (developers need to try before adopting)
4. **Establish community** (contributors multiply your output)

**Immediate Next Steps**:
1. Implement `memory/conversation` and `memory/semantic` primitives
2. Implement `tools/search` and `tools/filesystem` primitives
3. Create per-primitive documentation pages
4. Add eval tests for all existing primitives
