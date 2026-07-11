export type ComponentCategory =
  | "pixel"
  | "Reasoning"
  | "Memory"
  | "Tools"
  | "I/O surfaces"
  | "Guardrails"

export type ComponentRegistryItem = {
  name: string
  slug: string
  href: string
  category: ComponentCategory
  isNew?: boolean
  description: string
}

const pixelComponentEntries: Array<[string, string, boolean?]> = [
  ["Apple Hello Effect", "apple-hello-effect"],
  ["Brand Assets Menu", "brand-assets-menu"],
  ["Chevrons Up Down Icon", "chevrons-up-down-icon"],
  ["Code Block Command", "code-block-command"],
  ["Consent Manager", "consent-manager"],
  ["Copy Button", "copy-button"],
  ["Dot Grid Spotlight", "dot-grid-spotlight"],
  ["Elastic Slider", "elastic-slider"],
  ["Fluid Gradient Text", "fluid-gradient-text"],
  ["GitHub Contributions", "github-contributions"],
  ["GitHub Stars", "github-stars"],
  ["Glow Card Grid", "glow-card-grid"],
  ["Haptic Feedback", "haptic-feedback"],
  ["Icon Swap", "icon-swap"],
  ["Line Nav", "line-nav", true],
  ["Logos Carousel", "logos-carousel"],
  ["Middle Truncation", "middle-truncation"],
  ["Mobius Loop Icon", "mobius-loop-icon"],
  ["React Wheel Picker", "react-wheel-picker"],
  ["Scroll Fade Effect", "scroll-fade-effect"],
  ["Share Menu", "share-menu"],
  ["Shimmering Text", "shimmering-text"],
  ["Slide to Unlock", "slide-to-unlock"],
  ["Spinning Circular Text", "spinning-circular-text"],
  ["Spotlight Logo", "spotlight-logo"],
  ["Testimonial", "testimonial"],
  ["Testimonial 2", "testimonial-2"],
  ["Testimonial Spotlight", "testimonial-spotlight"],
  ["Testimonials Marquee", "testimonials-marquee"],
  ["Text Flip", "text-flip"],
  ["Theme Switcher", "theme-switcher"],
  ["Theme Toggle Effect", "theme-toggle-effect"],
  ["TOC Minimap", "toc-minimap"],
  ["Twemoji", "twemoji"],
  ["Work Experience", "work-experience"],
]

export const pixelComponents: ComponentRegistryItem[] = pixelComponentEntries.map(([name, slug, isNew]) => ({
  name,
  slug,
  href: `/components/${slug}`,
  category: "pixel" as ComponentCategory,
  description: "A pixel-ui interface component.",
  isNew: Boolean(isNew),
})).sort((a, b) => a.name.localeCompare(b.name))

const aiElementComponentEntries: Array<[string, string, ComponentCategory, string, boolean?]> = [
  ["Conversation", "conversation", "I/O surfaces", "Scrollable chat surface with pinned-bottom behavior.", true],
  ["Message", "message", "I/O surfaces", "Role-aware chat message shell."],
  ["Message Content", "message-content", "I/O surfaces", "Readable message body for streamed text."],
  ["Message Avatar", "message-avatar", "I/O surfaces", "Avatar slot pattern for message rows."],
  ["Prompt Input", "prompt-input", "I/O surfaces", "Composer form with attachment and submit primitives.", true],
  ["Tool", "tool", "Tools", "Expandable tool call with status, input, and output states.", true],
  ["Reasoning", "reasoning", "Reasoning", "Collapsible reasoning disclosure with streaming state.", true],
  ["Chain Of Thought", "chain-of-thought", "Reasoning", "Step-by-step reasoning timeline disclosure.", true],
  ["Task", "task", "Reasoning", "Collapsible task step list for agent work."],
  ["Queue", "queue", "Reasoning", "Grouped queue for pending, running, and completed work.", true],
  ["Plan", "plan", "Reasoning", "Expandable plan card for multi-step execution.", true],
  ["Attachments", "attachments", "I/O surfaces", "File chip and preview primitives for prompt input.", true],
  ["Source", "source", "Memory", "Citation/source link primitive from AI Elements sources.", true],
  ["Branch", "branch", "Memory", "Message branch selector and alternate response controls."],
  ["Artifact", "artifact", "Memory", "Document/artifact panel for generated output.", true],
  ["Actions", "actions", "Guardrails", "Inline message action buttons for copy, retry, and vote flows."],
  ["Suggestion", "suggestion", "Guardrails", "Prompt suggestion chips for guided next actions.", true],
  ["Loader", "loader", "Guardrails", "Loading and shimmer feedback for agent states."],
  ["Code Block", "code-block", "Tools", "Syntax-highlighted code container with copy controls."],
  ["Terminal", "terminal", "Tools", "Terminal output surface with status and actions."],
  ["File Tree", "file-tree", "Tools", "Navigable file tree for generated workspaces."],
  ["Checkpoint", "checkpoint", "Tools", "Checkpoint marker and restore trigger."],
]

export const aiElementComponents: ComponentRegistryItem[] = aiElementComponentEntries.map(([name, slug, category, description, isNew]) => ({
  name,
  slug,
  href: `/components/${slug}`,
  category,
  description,
  isNew: Boolean(isNew),
})).sort((a, b) => a.name.localeCompare(b.name))

const essentialComponentEntries: Array<[string, string, ComponentCategory, string]> = [
  ["Confirmation", "confirmation", "Guardrails", "Approval and denial surfaces for high-impact tool calls."],
  ["Model Selector", "model-selector", "I/O surfaces", "Provider and model switcher for multi-model agent products."],
  ["Sandbox", "sandbox", "Tools", "Isolated execution preview for generated code and commands."],
  ["Web Preview", "web-preview", "Tools", "Live browser preview for generated apps and artifacts."],
]

export const essentialComponents: ComponentRegistryItem[] = essentialComponentEntries.map(([name, slug, category, description]) => ({
  name,
  slug,
  href: `/components/${slug}`,
  category,
  description,
  isNew: true,
}))

function uniqueBySlug(items: ComponentRegistryItem[]) {
  const seen = new Set<string>()

  return items.filter((item) => {
    if (seen.has(item.slug)) {
      return false
    }

    seen.add(item.slug)
    return true
  })
}

export const componentRegistry = uniqueBySlug([...aiElementComponents, ...essentialComponents])

export const essentialAiNativeComponents = [
  ...essentialComponents.map(({ name, category, description }) => ({ name, category, description, href: `/components/${name.toLowerCase().replace(/\s+/g, "-")}` })),
  {
    name: "Schema Display",
    category: "Tools",
    description: "Structured output and Zod schema visualizer.",
  },
  {
    name: "Voice Input",
    category: "I/O surfaces",
    description: "Speech input, transcription, and voice selector primitives.",
  },
  {
    name: "Workflow Canvas",
    category: "Memory",
    description: "Node, edge, panel, and toolbar surfaces for agent workflows.",
  },
].sort((a, b) => a.name.localeCompare(b.name))

export const componentCategories: Array<"All" | Exclude<ComponentCategory, "pixel">> = [
  "All",
  "Reasoning",
  "Memory",
  "Tools",
  "I/O surfaces",
  "Guardrails",
]
