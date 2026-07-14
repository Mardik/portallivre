# Research: Unified Search

## Decision 1: Use the existing Payload search plugin

Decision: keep `@payloadcms/plugin-search` as the indexing engine and expand the current
posts-only wiring to include pages as well.

Rationale: the plugin is already installed, already generates the mirrored `search`
collection, and already participates in the repo's Payload sync lifecycle. Reusing it
keeps the change inside the existing architecture and avoids introducing a second search
system.

Alternatives considered: a custom mirror collection, a bespoke SQL search layer, or an
external search provider.

## Decision 2: Keep the public entry point at `/search`

Decision: preserve the existing public search route and query string input while evolving
the result rendering behind it.

Rationale: the route already exists, is discoverable, and can be refined without changing
user habits or portal navigation.

Alternatives considered: separate result pages per content type, or an API-only search
surface.

## Decision 3: Render search results with a generic result component

Decision: replace the post-specific archive rendering with a unified result surface that
can display pages and posts together.

Rationale: the current archive/card stack is tied to `posts`, but unified search needs a
single mixed list that can point to multiple content types without forcing them into a
post-shaped card.

Alternatives considered: keeping two separate result lists or overloading the post card to
hide content-type differences.

## Decision 4: Index only public, published fields

Decision: limit mirrored search data to public discovery fields such as title, slug, SEO
title/description, and other non-sensitive metadata that helps visitors find content.

Rationale: the constitution requires draft exclusion and public-data safety, and the
search index should never expose internal or unpublished content.

Alternatives considered: indexing full document bodies, indexing every public field, or
including draft content behind a preview token.

## Decision 5: Keep lifecycle sync aligned with existing publish hooks

Decision: reuse the collection publish/revalidate lifecycle already present in pages and
posts, and add search sync behavior around those same transitions.

Rationale: the repo already treats published content as the public source of truth and
has explicit hooks for publish/unpublish/delete revalidation.

Alternatives considered: background reindex jobs or manual index refresh only.
