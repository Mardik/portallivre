<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME -> I. Integrated Next.js and Payload Architecture
- PRINCIPLE_2_NAME -> II. Tailwind Design Tokens Only
- PRINCIPLE_3_NAME -> III. Payload Static Typing and Access Safety
- PRINCIPLE_4_NAME -> IV. Draft-First Dynamic Content
- PRINCIPLE_5_NAME -> V. Public Portal Accessibility
Added sections:
- Platform Constraints
- Delivery Gates
Removed sections:
- None
Templates requiring updates:
- updated: .specify/templates/plan-template.md
- updated: .specify/templates/spec-template.md
- updated: .specify/templates/tasks-template.md
Follow-up TODOs:
- None
-->
# Portal Livre Constitution

## Core Principles

### I. Integrated Next.js and Payload Architecture
The application MUST remain a single integrated Next.js App Router and Payload CMS
codebase. Public routes, server components, route handlers, Payload admin routes,
collections, globals, hooks, and shared utilities MUST live in the established project
structure under `src/` and use the same runtime configuration. Features MUST use the
Payload Local API from server-side Next.js code when reading or mutating CMS data, and
MUST document cache and revalidation behavior when public pages depend on Payload
content.

Rationale: the project is a public portal and CMS in one deployable unit; splitting
frontend and CMS concerns without a documented need increases operational risk and
weakens content preview, draft, and revalidation flows.

### II. Tailwind Design Tokens Only
Styling MUST use Tailwind CSS utility classes backed by values defined in the Tailwind
configuration, CSS variables, or project design tokens. Arbitrary value classes such as
`w-[37px]`, `text-[#123456]`, or `grid-cols-[...]` MUST NOT be introduced in application
code unless the value is first promoted into configuration or a named token. Exceptions
for one-off third-party integration fixes MUST be documented in the implementation plan
with the selector, reason, and removal path.

Rationale: public portals need consistent visual language, maintainable theming, and
predictable responsive behavior across many content-driven pages.

### III. Payload Static Typing and Access Safety
Payload schema changes MUST be represented with Payload TypeScript config types such as
`CollectionConfig`, `GlobalConfig`, field config types, and generated types from
`payload-types.ts`. Any feature that changes collections, globals, fields, access
control, hooks, or endpoints MUST include a type-generation task and MUST update imports
to use generated document types where data crosses module boundaries. Local API
operations performed on behalf of a user MUST pass `overrideAccess: false`; nested
operations inside hooks MUST pass `req` when transaction consistency matters.

Rationale: static typing is the project's guardrail for CMS contracts, access control,
and public rendering correctness.

### IV. Draft-First Dynamic Content
Dynamic public content collections MUST enable Payload drafts with
`versions: { drafts: true }` unless the plan explicitly classifies the collection as
system-only, immutable, or non-editorial. Draft-enabled collections MUST define how
preview, publish, scheduled publish when applicable, and revalidation behave. Public
queries MUST exclude drafts by default, while preview flows MUST require authenticated
or otherwise protected access.

Rationale: editors need safe review and preview workflows before content appears on a
public portal.

### V. Public Portal Accessibility
All public-facing UI MUST satisfy WCAG 2.2 AA and Brazilian e-MAG expectations relevant
to the feature. Specifications and plans MUST include keyboard navigation, visible focus,
semantic structure, landmarks, headings, form labels, error messaging, color contrast,
alternative text, responsive zoom behavior, and language/localization considerations
where the feature touches public pages or content. Accessibility acceptance criteria
MUST be testable without relying only on visual inspection.

Rationale: public portals must be usable by the widest possible audience and align with
public-sector accessibility standards.

## Platform Constraints

- The approved stack is Next.js with the App Router, Tailwind CSS, and integrated
  Payload CMS.
- Features MUST preserve the integrated `src/app` and `src/payload.config.ts` model
  unless a constitution amendment approves a different architecture.
- Payload collection and global definitions SHOULD stay in dedicated modules and reuse
  shared access-control, hooks, and field factories when doing so reduces duplication.
- Public content queries MUST document draft, locale when applicable, depth, select, and
  access-control behavior.
- Tailwind tokens MUST be added to the project configuration before use in components.
- Accessibility requirements apply to generated content surfaces as well as hand-coded
  components.

## Delivery Gates

- `spec.md` MUST state any public accessibility requirements, content lifecycle needs,
  and editorial roles affected by the feature.
- `plan.md` MUST pass the Constitution Check before research and again after design,
  covering the integrated architecture, Tailwind token usage, Payload typing,
  draft/publish behavior, and accessibility.
- `tasks.md` MUST include concrete tasks for Payload type generation after schema
  changes, draft/preview/revalidation work for dynamic collections, Tailwind token
  additions before component usage, and accessibility validation for public UI.
- Implementation MUST run the project's relevant validation commands before completion
  when the affected files have executable checks.
- Any justified violation MUST be listed in Complexity Tracking with the simpler
  compliant alternative and the reason it was rejected.

## Governance

This constitution supersedes conflicting local practices, generated plans, and task
lists. Amendments MUST update this file, increment the semantic version, record the
impact in the Sync Impact Report, and propagate mandatory rule changes to dependent
Spec Kit templates in the same change.

Versioning policy:
- MAJOR: removes a principle, replaces the approved stack, or weakens a MUST requirement.
- MINOR: adds a principle, section, or new mandatory delivery gate.
- PATCH: clarifies wording without changing obligations.

Compliance review is required at feature planning, task generation, implementation, and
review. Constitution violations are blocking unless the plan documents an approved,
time-bounded exception in Complexity Tracking.

**Version**: 1.0.0 | **Ratified**: 2026-07-14 | **Last Amended**: 2026-07-14
