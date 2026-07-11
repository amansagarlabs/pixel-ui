# pixel-ui Audit Report

**Date:** 2025-07-07  
**Auditor:** opencode  
**Scope:** `/`, `/components`, `/components/[slug]`, `/docs`, `/blocks`, `/primitives`

---

## STEP 1 — AUDIT CHECKLIST

### 1. Implemented vs Placeholder/Missing

| Feature | Status | Notes |
|---------|--------|-------|
| Bento grid (homepage) | ✅ Implemented | 6 cells with live AI Elements previews |
| LogosCarousel | ✅ Implemented | 8 real brand SVGs, staggered wave animation |
| AI Elements integration | ✅ Implemented | 21/22 have live previews (MessageAvatar missing) |
| Category filters (components page) | ✅ Implemented | Tabs: All, Reasoning, Memory, Tools, I/O surfaces, Guardrails |
| TOCMinimap | ✅ Implemented | With loading skeleton, auto-discovers headings |
| Search wiring (sidebar) | ✅ Implemented | Filter by name/href, "No components found" state |
| Search command palette (header) | ✅ Implemented | Cmd+K, searches component registry |
| Blocks page | ⚠️ Partial | 6 preview stubs, detail pages are empty shells |
| Primitives page | ⚠️ Partial | 9/13 have generic fallback previews |
| Essential AI-native components | ✅ Implemented | Confirmation, Model Selector, Sandbox, Web Preview |
| Loading skeletons | ✅ Implemented | `/components` route has `loading.tsx` |
| Previous/Next navigation | ❌ Non-functional | Buttons render but no onClick handlers |
| Grid/list toggle (homepage) | ❌ Non-functional | Buttons render but do nothing |
| Expand button (clipped code) | ❌ Non-functional | Renders but no onClick handler |
| Social media links (footer) | ❌ Dead links | `href="#"` placeholders |
| QR code (homepage) | ❌ Placeholder | CSS dot-grid, not scannable |

### 2. Visual Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| Two different stripe dividers | `page.tsx` lines 63 vs 109 | Medium |
| Preview tabs have `border-b`, install tabs do not | `component-detail-page.tsx` lines 188 vs 221 | Medium |
| Hover opacity `/35` inconsistent with `/40` elsewhere | `component-registry-grid.tsx` lines 93, 130 | Low |
| Filler cell `min-h-[58px]` vs content cell `min-h-10` | `component-registry-grid.tsx` lines 178 vs 130 | Low |
| Mobile sheet 320px vs desktop sidebar 280px | `docs-layout.tsx` line 77 vs `macos-sidebar.tsx` line 58 | Low |
| Search shows "Ctrl" but macOS uses Cmd | `site-header.tsx` lines 111-112 | Low |
| API table header has no background | `component-detail-page.tsx` line 276 | Low |
| Primitives page title says "Components" | `primitives/page.tsx` line 18 | Medium |
| Hardcoded colors in essential previews break dark mode | `essential-preview.tsx` lines 13, 27, 40 | High |
| Skeleton has no `aria-hidden` | `skeleton.tsx` | Medium |

### 3. Dead/Broken Links

| Location | Link | Issue |
|----------|------|-------|
| `page.tsx:493` | `href="#"` (X/Twitter) | Dead link |
| `page.tsx:495` | `href="#"` (LinkedIn) | Dead link |
| `page.tsx:496` | `href="#"` (DMCA) | Dead link |
| `docs-layout.tsx:28-30` | TOC anchors `#support`, `#contact` | No matching `id` in sponsors page |
| `components/page.tsx:56-63` | Social media buttons | Non-functional `<button>` elements |
| `components/page.tsx:196-203` | "Discover more" pills | `<span>` not `<Link>` |
| `components/page.tsx:165-178` | Essential AI-native items | Have `href` but not rendered as links |

### 4. Performance Issues

| Issue | Location | Severity |
|-------|----------|----------|
| Homepage is entirely `'use client'` | `page.tsx` line 1 | Medium |
| Blocks page is entirely `'use client'` | `blocks/page.tsx` line 1 | Low |
| Primitives detail page is entirely `'use client'` | `primitives/[name]/page.tsx` line 1 | Low |
| LogosCarousel uses motion/react | `logos-carousel.tsx` | Low (acceptable) |
| CommandDialog imported on every page | `site-header.tsx` | Low |

---

## STEP 2 — PIXEL-LEVEL POLISH PASS

### 1. MICRO-INTERACTIONS (Priority: HIGH)

| Item | Current State | Target State |
|------|---------------|--------------|
| Interactive row transitions | No transition on bg/color | 120-150ms ease-out |
| Copy button feedback | Icon swap works, but aria-label static | Update aria-label to "Copied!" |
| Active nav indicator | Line Nav has spring animation | ✅ Already implemented |
| Tab indicator | CodeBlockCommand has animated underline | ✅ Already implemented |
| Essential preview state changes | Instant snap | Add transition-all |

### 2. AI-NATIVE VISUAL LANGUAGE (Priority: HIGH)

| Item | Current State | Target State |
|------|---------------|--------------|
| Streaming text previews | Static text | Char-by-char reveal with cursor |
| Tool-call states | Basic styling | Distinct pulse/check/error states |
| Reasoning previews | Already collapsible | Add step counter badge |
| Loader usage | Ad-hoc div | Use real AI Elements Loader |

### 3. TYPOGRAPHY/DETAIL POLISH (Priority: MEDIUM)

| Item | Current State | Target State |
|------|---------------|--------------|
| Icon+text vertical alignment | May be off 1-2px | Center against cap-height |
| Numeric/mono content | Default tabular | Add `tabular-nums` |
| All-caps labels | Inconsistent tracking | Use `tracking-wide` consistently |

### 4. EMPTY/LOADING/ERROR STATES (Priority: MEDIUM)

| Item | Current State | Target State |
|------|---------------|--------------|
| Search no results | "No components found" text | Styled empty state |
| Preview loading | No skeleton | Skeleton matching final dimensions |

### 5. RESPONSIVE CHECK (Priority: MEDIUM)

| Breakpoint | Current State | Target State |
|------------|---------------|--------------|
| Tablet (768px) | Sidebar hidden, TOC hidden | ✅ Correct |
| Mobile (375px) | Sheet sidebar, stacked grid | ✅ Correct |
| Bento grid responsive | Uses grid cols | ✅ Correct |
