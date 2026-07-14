# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript on Next.js App Router / Payload CMS or NEEDS CLARIFICATION

**Primary Dependencies**: Next.js, Payload CMS, Tailwind CSS or NEEDS CLARIFICATION

**Storage**: Payload database adapter and configured storage providers or NEEDS CLARIFICATION

**Testing**: Project lint, build, type generation, and feature-specific tests or NEEDS CLARIFICATION

**Target Platform**: Public web portal and Payload admin in a single Next.js app or NEEDS CLARIFICATION

**Project Type**: Integrated Next.js App Router + Payload CMS web application

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: Tailwind tokens only, Payload static typing, drafts for dynamic content,
WCAG 2.2 AA/e-MAG accessibility, integrated architecture or NEEDS CLARIFICATION

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Integrated architecture**: Feature keeps public UI, Payload admin/CMS, route handlers,
  collections, globals, and shared utilities inside the integrated Next.js App Router +
  Payload codebase; deviations are justified in Complexity Tracking.
- **Tailwind token discipline**: UI work uses Tailwind config, CSS variables, or named
  design tokens; no new arbitrary value classes are planned without a documented token
  promotion or exception.
- **Payload typing and access safety**: Schema, access control, hooks, endpoints, and
  Local API usage rely on Payload config types and generated `payload-types.ts`; user
  scoped Local API calls enforce access with `overrideAccess: false`.
- **Draft workflow**: Dynamic/editorial collections enable
  `versions: { drafts: true }` and define preview, publish, scheduled publish where
  applicable, public draft exclusion, and revalidation behavior.
- **Accessibility**: Public portal UI plans include WCAG 2.2 AA and e-MAG acceptance
  criteria for keyboard, focus, semantics, landmarks, headings, labels, errors, contrast,
  alternative text, responsive zoom, and language/localization where relevant.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/                 # App Router routes, route handlers, public pages, Payload admin
├── collections/         # Payload collections
├── globals/             # Payload globals
├── components/          # Shared UI components
├── fields/              # Reusable Payload field factories
├── hooks/               # Payload and app hooks
├── access/              # Payload access-control helpers
├── lib/                 # Shared server/client utilities
├── payload.config.ts
└── payload-types.ts     # Generated after schema changes
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
