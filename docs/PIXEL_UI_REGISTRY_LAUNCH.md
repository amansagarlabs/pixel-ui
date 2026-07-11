# Pixel UI Registry Launch Plan

## Decision

Use **Pixel UI** as the public product and use a dedicated registry subdomain for shadcn-compatible JSON.

Recommended domains:

- Product/docs site: `https://pixel.amansagar.in`
- Registry API: `https://registry.pixel-ui.amansagar.in`
- Portfolio/redirect page: `https://www.amansagar.in/pixel-ui`

Do not use `https://www.amansagar.in/pixel-ui/r/actions.json` as the primary registry URL. It can work, but it is weaker for launch because the registry becomes a path inside a personal site. A dedicated registry subdomain is clearer, easier to cache, easier to document, and better if the product grows beyond your personal domain.

## Public Install Contract

Every component detail page should show the exact command for the component being previewed.

Example for `/components/actions`:

```bash
npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/actions.json
```

Also support a namespace setup for repeat users:

```bash
npx shadcn@latest registry add @pixel-ui=https://registry.pixel-ui.amansagar.in/r/{name}.json
npx shadcn@latest add @pixel-ui/actions
```

The catalog URL should be:

```text
https://registry.pixel-ui.amansagar.in/r/registry.json
```

The item URL template should be:

```text
https://registry.pixel-ui.amansagar.in/r/{name}.json
```

## Why This Shape

The shadcn registry model expects a root registry catalog and item-level JSON files. The catalog is used for list/search flows, while an item URL is used for view/add flows.

This means Pixel UI should publish:

- `/r/registry.json` for catalog discovery.
- `/r/actions.json` for direct install of `actions`.
- `/r/prompt-input.json` for direct install of `prompt-input`.
- `/r/tool.json` for direct install of `tool`.

This lets users install a component from the component detail page without installing a separate Pixel UI CLI.

## Product Positioning

Pixel UI should be positioned as:

> Agentic UI primitives you copy into your app.

The core promise:

- Like shadcn/ui: source-first, copy-owned components.
- Like AI Elements: useful primitives for chat, tools, reasoning, memory, and guardrails.
- Unlike a black-box package: users own the runtime and can edit the source.

Use this language consistently:

- "Copy the source, own the runtime."
- "Agentic UI primitives for AI-native products."
- "Install exactly what you see on the component page."

Avoid saying the registry is only for React if the long-term plan includes hooks, prompts, config, rules, or non-React files. The shadcn registry format can distribute more than UI components.

## Registry Item Shape

Each generated item should use shadcn registry types, not Pixel UI custom types.

Example item:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "actions",
  "type": "registry:ui",
  "title": "Actions",
  "description": "Inline message action buttons for copy, retry, and vote flows.",
  "dependencies": ["lucide-react"],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/pixel-ui/actions.tsx",
      "type": "registry:ui"
    }
  ]
}
```

Root catalog:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "pixel-ui",
  "homepage": "https://pixel.amansagar.in",
  "items": [
    {
      "name": "actions",
      "type": "registry:ui",
      "title": "Actions",
      "description": "Inline message action buttons for copy, retry, and vote flows.",
      "files": [
        {
          "path": "components/pixel-ui/actions.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

## Route Plan

Use static JSON first. It is simpler and matches the launch need.

Generate these files:

```text
apps/docs/public/r/registry.json
apps/docs/public/r/actions.json
apps/docs/public/r/conversation.json
apps/docs/public/r/prompt-input.json
apps/docs/public/r/tool.json
```

Then deploy the docs app twice or route by domain:

- `pixel.amansagar.in` serves the marketing/docs app.
- `registry.pixel-ui.amansagar.in` serves the same app or static output, but users only hit `/r/*.json`.

If hosting on Vercel, both domains can point at the same project. The registry subdomain does not need a separate app for launch as long as `/r/*.json` resolves publicly with correct JSON content.

## Component Page Requirement

Every component page must show:

```bash
npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/{slug}.json
```

For example:

- `/components/actions` shows `/r/actions.json`
- `/components/conversation` shows `/r/conversation.json`
- `/components/prompt-input` shows `/r/prompt-input.json`

This is the main product loop:

1. User browses Pixel UI.
2. User opens a component detail page.
3. User sees preview and source behavior.
4. User copies one shadcn command.
5. The exact component lands in their project.

## Launch Checklist

1. Convert registry output to shadcn schema.
2. Generate `apps/docs/public/r/registry.json`.
3. Generate one item JSON file per public component.
4. Update component detail install commands to `npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/{slug}.json`.
5. Add namespace docs:

```bash
npx shadcn@latest registry add @pixel-ui=https://registry.pixel-ui.amansagar.in/r/{name}.json
npx shadcn@latest add @pixel-ui/actions
```

6. Add a `/docs/registry` page explaining direct URL install and namespace install.
7. Add redirects:

```text
https://www.amansagar.in/pixel-ui -> https://pixel.amansagar.in
https://pixel-ui.amansagar.in -> https://pixel.amansagar.in
```

8. Test with a clean Next.js app:

```bash
npx shadcn@latest add https://registry.pixel-ui.amansagar.in/r/actions.json
npx shadcn@latest registry add @pixel-ui=https://registry.pixel-ui.amansagar.in/r/{name}.json
npx shadcn@latest add @pixel-ui/actions
```

## Recommended First Public Components

Launch with the reliable agentic UI set before expanding toward the full 61+ library:

- `actions`
- `conversation`
- `message`
- `prompt-input`
- `tool`
- `reasoning`
- `task`
- `queue`
- `attachments`
- `code-block`
- `terminal`
- `file-tree`

These match the Pixel UI promise: agent chat, reasoning, tools, memory, and guardrails.

## Naming Rules

Use `pixel-ui` everywhere public-facing.

Use:

- `Pixel UI` for product name.
- `@pixel-ui/{name}` for namespace examples.
- `components/pixel-ui/{name}.tsx` as the install target path.
- `registry.pixel-ui.amansagar.in` for registry JSON.

Avoid:

- `pixelblocks` in new public install docs.
- `KaidonBlocks` in public examples.
- `ui:component` as a registry type.
- `agent:primitive` for shadcn-installable UI items.

Keep `agent:primitive` only if you maintain a separate non-shadcn agent runtime registry.
