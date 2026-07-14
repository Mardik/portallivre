# Tasks: Unified Search

**Input**: Design documents from `/specs/001-unified-search/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Story phases focus on implementation. Validation coverage is captured in the
final polish phase through the repository's existing integration and E2E suites.

**Organization**: Tasks are grouped by user story so each story can be implemented and
validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Every task includes an exact file path

## Path Conventions

- App Router public search flow lives in `src/app/(frontend)/search/`
- Payload collection configuration lives in `src/collections/`
- Plugin search wiring lives in `src/plugins/index.ts`
- Search sync helpers live in `src/search/`
- Shared result rendering lives in `src/components/Card/` and
  `src/components/CollectionArchive/`
- Automated validation lives in `tests/int/` and `tests/e2e/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the feature boundaries and validation targets before implementation

- [ ] T001 Review current search touchpoints in `src/plugins/index.ts`, `src/search/beforeSync.ts`, and `src/app/(frontend)/search/page.tsx`
- [ ] T002 Review existing publication lifecycle hooks in `src/collections/Pages/hooks/revalidatePage.ts` and `src/collections/Posts/hooks/revalidatePost.ts`
- [ ] T003 [P] Review existing validation entry points in `tests/int/api.int.spec.ts`, `tests/e2e/frontend.e2e.spec.ts`, and `specs/001-unified-search/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared search schema, sync behavior, and reusable rendering before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Expand plugin search scope from posts-only to pages and posts in `src/plugins/index.ts`
- [ ] T005 [P] Add collection-aware mirrored fields for unified search entries in `src/search/fieldOverrides.ts`
- [ ] T006 [P] Refactor collection-aware search sync mapping for public data only in `src/search/beforeSync.ts`
- [ ] T007 Adapt shared result rendering for mixed page/post results in `src/components/Card/index.tsx` and `src/components/CollectionArchive/index.tsx`
- [ ] T008 Generate updated Payload search types in `src/payload-types.ts`
- [ ] T009 Validate shared accessibility and status-message baseline in `src/search/Component.tsx` and `src/app/(frontend)/search/page.client.tsx`

**Checkpoint**: Shared search infrastructure supports mixed result types and updated schema

---

## Phase 3: User Story 1 - Search Portal Content (Priority: P1) 🎯 MVP

**Goal**: Let public visitors search published pages and posts through one unified interface

**Independent Test**: Publish one page and one post with a shared term, open `/search?q=<term>`, and confirm both appear in one accessible results flow with usable empty and blank-query states.

### Implementation for User Story 1

- [ ] T010 [US1] Query unified `search` results for pages and posts in `src/app/(frontend)/search/page.tsx`
- [ ] T011 [P] [US1] Add collection-aware destination handling for unified result cards in `src/components/Card/index.tsx`
- [ ] T012 [P] [US1] Update unified archive rendering and mixed-result layout in `src/components/CollectionArchive/index.tsx`
- [ ] T013 [US1] Handle blank queries, result messaging, and empty states in `src/search/Component.tsx` and `src/app/(frontend)/search/page.tsx`
- [ ] T014 [US1] Apply final search page copy and token-based styling in `src/app/(frontend)/search/page.tsx` and `src/search/Component.tsx`

**Checkpoint**: Visitors can search and browse unified page/post results without admin access

---

## Phase 4: User Story 2 - Define Indexed Content (Priority: P2)

**Goal**: Let administrators control which pages and posts participate in the unified index

**Independent Test**: Enable one supported content type, disable the other, publish content in both, and confirm only the enabled content type appears in public search.

### Implementation for User Story 2

- [ ] T015 [P] [US2] Add collection-level search scope configuration for pages in `src/plugins/index.ts`
- [ ] T016 [P] [US2] Add collection-level search scope configuration for posts in `src/plugins/index.ts`
- [ ] T017 [US2] Enforce configured search scope and public field whitelisting in `src/search/beforeSync.ts` and `src/search/fieldOverrides.ts`
- [ ] T018 [US2] Implement an explicit search reindex or refresh path for pages and posts in `src/plugins/index.ts` and `src/search/beforeSync.ts`
- [ ] T019 [US2] Generate updated Payload types for indexing controls in `src/payload-types.ts`

**Checkpoint**: Administrators can control whether eligible pages/posts participate in unified search

---

## Phase 5: User Story 3 - Keep Search Visibility Aligned With Publishing (Priority: P3)

**Goal**: Ensure drafts, unpublished changes, and removed content never leak into public search

**Independent Test**: Create draft content, verify it does not appear in `/search`, publish it and verify it appears, then unpublish or delete it and verify it disappears again.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Align page publish and unpublish revalidation behavior with search visibility in `src/collections/Pages/hooks/revalidatePage.ts`
- [ ] T021 [P] [US3] Align post publish and unpublish revalidation behavior with search visibility in `src/collections/Posts/hooks/revalidatePost.ts`
- [ ] T022 [US3] Enforce draft and unpublished exclusion in public unified search reads in `src/app/(frontend)/search/page.tsx` and `src/search/beforeSync.ts`
- [ ] T023 [US3] Add search lifecycle safeguards for deletions and de-scoping in `src/search/beforeSync.ts` and `src/plugins/index.ts`

**Checkpoint**: Search visibility stays in sync with the publish lifecycle for pages and posts

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the feature across automated checks and the documented quickstart flow

- [ ] T024 [P] Update integration coverage for unified search behavior in `tests/int/api.int.spec.ts`
- [ ] T025 [P] Update frontend E2E coverage for public search journeys in `tests/e2e/frontend.e2e.spec.ts`
- [ ] T026 [P] Validate administrator-triggered search refresh behavior in `tests/int/api.int.spec.ts` and `specs/001-unified-search/quickstart.md`
- [ ] T027 [P] Measure and document typical search response time for `/search?q=<term>` in `tests/e2e/frontend.e2e.spec.ts` and `specs/001-unified-search/quickstart.md`
- [ ] T028 Validate and adjust the feature walkthrough in `specs/001-unified-search/quickstart.md`
- [ ] T029 Run lint, type generation, integration, and E2E validation using `package.json` and record any follow-up fixes in `specs/001-unified-search/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** starts immediately
- **Phase 2: Foundational** depends on Phase 1 and blocks all story work
- **Phase 3: User Story 1** depends on Phase 2 and defines the MVP
- **Phase 4: User Story 2** depends on Phase 2 and builds on the shared search schema
- **Phase 5: User Story 3** depends on Phases 2, 3, and 4 because lifecycle rules must cover the final unified search flow
- **Phase 6: Polish** depends on all implemented stories

### User Story Dependencies

- **US1** has no dependency on other user stories after the foundational phase
- **US2** depends on the foundational schema and sync work, but can be validated independently from lifecycle refinements
- **US3** depends on the unified search flow existing and on the indexing controls being in place

### Within Each User Story

- Shared schema or plugin changes come before regenerated types
- Regenerated types come before UI or query code that depends on them
- Public UI behavior comes before validation coverage
- Each story should be validated at its checkpoint before moving on

### Parallel Opportunities

- `T003` can run while `T001` and `T002` are being reviewed
- `T005` and `T006` can run in parallel after `T004`
- `T011` and `T012` can run in parallel after `T010`
- `T015` and `T016` can run in parallel inside US2
- `T020` and `T021` can run in parallel inside US3
- `T024` and `T025` can run in parallel during polish

---

## Parallel Example: User Story 1

```bash
# After T010 is complete, these can proceed together:
Task: "Add collection-aware destination handling for unified result cards in src/components/Card/index.tsx"
Task: "Update unified archive rendering and mixed-result layout in src/components/CollectionArchive/index.tsx"
```

---

## Implementation Strategy

### MVP First

1. Complete Setup
2. Complete Foundational work
3. Complete User Story 1
4. Validate `/search` with one page and one post
5. Stop for review if the MVP is sufficient

### Incremental Delivery

1. Deliver unified public search for pages and posts
2. Add administrator controls for what gets indexed
3. Tighten lifecycle behavior so drafts and removals stay out of public search
4. Finish with automated coverage and quickstart validation

### Team Parallelization

1. One teammate can own plugin/sync work in `src/plugins/` and `src/search/`
2. Another can own public UI work in `src/app/(frontend)/search/` and `src/components/`
3. Validation work in `tests/` can start once the main behavior stabilizes

---

## Notes

- Every task follows the required checkbox + ID + file path format
- Story tasks use `[US1]`, `[US2]`, and `[US3]` labels for traceability
- The suggested MVP scope is Phase 3 / User Story 1
