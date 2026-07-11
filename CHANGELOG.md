# Changelog

All notable changes to pixel-ui.

## [0.1.0] - 2026-07-03

### Added
- CLI package with 7 commands: `init`, `add`, `remove`, `list`, `doctor`, `test`, `upgrade`
- Registry package with `RegistryClient`, `ConfigManager`, `CacheManager`
- Core package with shared types, Zod schemas, validators
- SDK package with factory functions for all primitives
- 11 primitives with full structure:
  - `planner` - Task decomposition and planning
  - `memory` - Short-term and long-term memory
  - `browser` - Web browsing and interaction
  - `evaluator` - Output evaluation and scoring
  - `reflection` - Self-reflection and improvement
  - `retry` - Retry logic with exponential backoff
  - `approval` - Human-in-the-loop approval
  - `router` - Multi-model routing
  - `telemetry` - Logging and monitoring
  - `security` - Guardrails and safety
  - `context` - Context window optimization
- Next.js documentation site in `apps/docs/`
- Tailwind CSS styling for docs site
- 80 tests passing across all packages
- Documentation: PRD, TRD, ARCHITECTURE, CLI_SPEC, REGISTRY_SPEC, CONTRIBUTING

### Changed
- Renamed project from AgentCN to pixel-ui
- Updated CLI binary name to `pixel-ui`
- Updated config file name to `pixel-ui.json`
- Updated registry URL to `https://registry.pixel-ui.amansagar.in`

### Fixed
- CLI test updated to expect "pixel-ui" instead of "agentcn"
- Vitest config updated to exclude zod's internal tests
- Docs app tailwindcss dependency installed
