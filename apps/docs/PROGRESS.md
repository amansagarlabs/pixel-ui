# Pixel UI - Progress & Next Steps

> Private doc. Last updated: 2026-07-10

---

## What's Done

### Docs Site (localhost:3000)

- Left sidebar with 6 collapsible sections: Getting Started, Core Concepts, Guides, API Reference, Components, Resources.
- Right sidebar "On this page" TOC that auto-discovers headings and re-discovers on route change.
- 14 new docs pages: project-structure, primitives, components-guide, schema, adapters, guides/building-agents, guides/using-memory, guides/custom-primitives, guides/testing, guides/deployment, sdk-api, registry-api, configuration-api, contributing.
- CLI page centered and dark mode hover fixed.
- All headings have explicit `id` attributes for reliable TOC linking.
- Removed `loading.tsx` on `/components/[slug]` to eliminate skeleton flash on navigation.

### Waitlist Gate

- Proxy gate (`src/proxy.ts`) redirects all routes to `/waitlist` when `SITE_MODE=waitlist`.
- Static assets, `/_next`, and API routes are excluded.
- Local development bypasses the gate so the full docs stay visible while working.
- `/waitlist` page includes the animated grid background, email form, countdown timer, social proof avatars, and sonner toasts.
- `/api/waitlist` uses Drizzle, Resend, React Email, and Upstash rate limiting.
- Duplicate signups return a dedicated already-joined state in the UI.
- Private setup notes for email and domain config live in `private-notes/` and stay out of git.
- Final email sender target: `pixel-ui@amansagar.in` on the verified `amansagar.in` domain.
- `amansagar070707@gmail.com` is only for the Resend account login, not the production sender.

### Infrastructure

- Monorepo with Turborepo
- CLI package with 7 commands
- Registry SDK, Core package, SDK with factory functions
- 11 primitives implemented
- Next.js 16 docs site with Vercel-style design
- CI/CD pipeline with GitHub Actions

---

## What's Next

### High Priority

1. Database sync - keep the Drizzle schema and production Postgres table aligned.
2. Env vars on Vercel - set `DATABASE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
3. Disable waitlist mode - set `SITE_MODE=` when ready to launch the full docs.
4. Replace placeholder avatars - use real user avatars or remove the placeholders.

### Medium Priority

5. Email template - keep the React Email template aligned with the waitlist UI.
6. Admin dashboard - build a `/admin/waitlist` page to view exported emails, protected with auth.
7. OG image - add Open Graph meta tags and a generated OG image for the waitlist page.
8. Analytics - track waitlist signups with Vercel Analytics or PostHog.
9. More docs pages - fill out the Guides and API Reference sections with real content from the primitives.

### Low Priority / Ideas

10. Referral system - let users share a unique link to move up the waitlist.
11. Email sequences - automated drip emails after signup.
12. Waitlist counter - show a real signup count instead of hardcoded `12,500+`.
13. Dark/light theme toggle on the waitlist page.
14. Accessibility audit - make sure interactive elements are keyboard-navigable and screen-reader friendly.
15. E2E tests - add Playwright tests for the waitlist flow.

---

## Architecture Notes

- Waitlist gate is proxy-based and toggled by env var.
- Drizzle + Postgres are used for the waitlist database.
- Resend sends the confirmation email. Failure is non-blocking because the signup is already saved.
- Upstash Redis provides rate limiting without a separate service.
- The waitlist page is a client component, so countdown, form, and toasts all run in the browser.
- Private setup notes belong in `private-notes/` or `*.private.md`, which are ignored by git.
- Public env examples must stay placeholder-only; real API keys, database URLs, and Redis tokens remain in local `.env` files only.
