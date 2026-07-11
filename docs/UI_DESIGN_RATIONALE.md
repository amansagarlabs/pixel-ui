# pixel-ui UI Design Rationale

## What was done

The docs and component surfaces were moved toward a quiet, reference-grade component-library presentation:

- Added a flat top navigation bar with pixel UI branding, compact links, and icon actions.
- Added a persistent left Line Nav for docs and components.
- Added a component listing route at `/components` and detail aliases at `/components/[slug]`.
- Added the Attachments component demo as the first AI Elements-style surface.
- Reworked component detail pages to use live previews, schema tables, install commands, and file/code tabs.
- Replaced redirect-based component detail navigation with static component slug pages for faster route changes.
- Added a right-side “On this page” nav using the same Line Nav treatment as the component sidebar.
- Added a subtle shell system with thin rails, table-like lines, and diagonal stripe dividers.

## Design intent

pixel-ui should feel like a professional registry for AI agent UI primitives, not a generic SaaS landing page. The visual system should communicate:

- Source-first engineering.
- Minimal visual noise.
- Strong structure through grid, rails, and typography.
- Motion used for orientation, not decoration.
- Components that feel inspectable, copyable, and production-ready.

## Reference ideas used

### chanhdai.com/components

Used for the information architecture and visual rhythm:

- Centered content rail.
- Thin vertical alignment lines.
- Diagonal stripe section separators.
- Table-like component listing.
- Line Nav as the primary navigation language.
- Compact install blocks and dense component docs.

### chanhdai.com/components/line-nav

Used for the sidebar and table-of-contents interaction model:

- Active item expands its line marker.
- Labels stay muted until active or hovered.
- Long lists remain compact.
- Next.js navigation should use `motion.create(Link)` instead of plain anchors.

### Skiper UI

Used for motion taste, not visual noise:

- Smooth transitions over abrupt layout swaps.
- Sidebar/list movement should feel fluid and tactile.
- Decorative animation should stay out of documentation content.
- The UI should feel premium through timing, restraint, and spacing.

### Fumadocs

Used as the docs-shell structure reference:

- Left navigation.
- Center reading column.
- Right “On this page” navigation.
- Docs content remains readable and code-first.

## Visual system

### Layout

The shell uses three conceptual zones:

- Left: Line Nav for docs/components.
- Center: fixed readable content column.
- Right: optional table of contents.

The center content must remain visually stable when the sidebar opens or collapses. The sidebar therefore reserves a stable layout width and only animates the panel content.

### Lines and rails

The page uses thin rails and repeated horizontal lines to create a component-registry feel. Rails should frame the content, not overlap it. The rail width was widened to account for content padding and prevent the right vertical line from cutting through preview cards or tables.

### Stripes

Diagonal stripe bands are used as low-emphasis dividers. They should separate page regions without becoming decorative noise.

### Motion

Motion is limited to functional orientation:

- Sidebar open/collapse.
- Line Nav hover/active marker expansion.
- Copy/tab state changes.
- Live component demos.

Avoid page-level decorative animation in docs.

## Implementation notes

- `LineNav` uses `motion.create(Link)` so route changes stay client-side.
- `/components/[slug]` now uses `generateStaticParams()` and renders the mapped detail page directly instead of redirecting to `/primitives/[name]`.
- `TableOfContents` now renders through `LineNav` for consistent navigation behavior.
- `DocsLayout` owns the rails and stripe system so pages do not duplicate layout decoration.

## Current tradeoffs

- The primitive detail implementation is reused by component detail aliases to avoid maintaining duplicate docs UI.
- The sidebar keeps stable width while collapsed so the content column does not jump. This means collapse hides content visually rather than reclaiming horizontal space.
- `.next` build artifacts are still present locally and should not be committed.

## Next improvements

- Add active hash tracking for deeper docs pages beyond the default three sections.
- Add prefetch polish for component links if route transitions still feel heavy.
- Move primitive detail metadata into a shared registry-driven data module.
- Add a visual regression pass for `/components`, `/components/attachments`, and `/docs`.
