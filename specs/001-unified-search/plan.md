# Implementation Plan: Unified Search

**Branch**: `001-unified-search` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-unified-search/spec.md`

## Summary

Extend the existing Payload search mirror so the public portal can search pages and posts
through one unified interface, while preserving draft exclusion, public-only result
visibility, and the current integrated Next.js + Payload architecture.

## Technical Context

**Language/Version**: TypeScript 5.7 on Next.js 16 App Router with Payload CMS 3.86

**Primary Dependencies**: `@payloadcms/plugin-search`, `@payloadcms/db-postgres`,
`@payloadcms/plugin-seo`, React 19, Tailwind CSS 4

**Storage**: PostgreSQL via Payload's Postgres adapter; the plugin-managed `search`
collection acts as the mirrored index

**Testing**: `pnpm run lint`, `pnpm run generate:types`, `pnpm run test:int`,
`pnpm run test:e2e`

**Target Platform**: Public portal and Payload admin in one deployed Next.js app

**Project Type**: Integrated web application

**Performance Goals**: Public searches should feel immediate and stay within the
user-facing 3-second target defined in the spec for typical portal content volumes

**Constraints**: Integrated architecture only, Tailwind tokens only, Payload-generated
types, drafts enabled for editorial collections, public search excludes unpublished
content, WCAG 2.2 AA/e-MAG accessibility

**Scale/Scope**: Initial index scope is pages and posts, with the existing public
`/search` route as the user-facing entry point

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Integrated architecture**: The feature stays inside the existing Next.js App Router +
  Payload codebase and reuses `src/app`, `src/collections`, `src/search`, and
  `src/plugins`.
- **Tailwind token discipline**: Any UI adjustments use project tokens or configured
  Tailwind values; no ad hoc arbitrary-value classes are planned.
- **Payload typing and access safety**: Schema and search-mirror changes use Payload
  config types and generated `payload-types.ts`; user-scoped Local API calls keep
  `overrideAccess: false`.
- **Draft workflow**: Pages and posts remain draft-enabled, and public search excludes
  unpublished content by design.
- **Accessibility**: The public search form and results area must keep keyboard, focus,
  semantic, and screen-reader expectations aligned with WCAG 2.2 AA and e-MAG.

The planned work stays inside the approved constitution. No complexity exceptions are
expected.

## Project Structure

### Documentation (this feature)

```text
specs/001-unified-search/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── public-search.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── (frontend)/
│       └── search/
├── collections/
│   ├── Pages/
│   └── Posts/
├── components/
│   ├── Card/
│   └── CollectionArchive/
├── plugins/
│   └── index.ts
├── search/
│   ├── Component.tsx
│   ├── beforeSync.ts
│   └── fieldOverrides.ts
├── payload.config.ts
└── payload-types.ts
```

**Structure Decision**: Keep the unified search feature inside the current integrated
portal/CMS layout, expand the plugin-search wiring in `src/plugins/index.ts`, and update
the public search route and shared result rendering in `src/app/(frontend)/search/` and
`src/search/` so both pages and posts render through one consistent experience.

## Complexity Tracking

No constitution violations identified. No complexity tracking entry is required for this
feature.
