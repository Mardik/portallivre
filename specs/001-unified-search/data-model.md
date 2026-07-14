# Data Model: Unified Search

## Entities

### Search Query

Represents a visitor-submitted term or phrase.

Fields:
- `q`: raw text entered by the visitor

Rules:
- Blank or whitespace-only input must not produce a misleading error state.
- Queries are public and must not reveal private data.

### Search Index Entry

Represents the mirrored, searchable form of a published portal document.

Fields:
- `sourceType`: `pages` or `posts`
- `sourceID`: origin document identifier
- `title`: public title used for search ranking and display
- `slug`: public destination slug
- `metaTitle`: SEO title or fallback title
- `metaDescription`: SEO description or fallback excerpt
- `categories`: optional labels for posts
- `publishedAt`: publication timestamp

Rules:
- Only published, indexable content may produce an index entry.
- Drafts, unpublished documents, and restricted content must not be exposed.

### Search Result

Represents a public result item returned to a visitor.

Fields:
- `title`
- `description`
- `href`
- `contentType`

Rules:
- Result items must point to public destinations only.
- Empty or incomplete metadata must degrade gracefully.

### Index Scope Configuration

Represents the editorial definition of what content participates in unified search.

Fields:
- `enabledCollections`: initial values `pages` and `posts`
- `enabledFieldsByCollection`: collection-specific public field whitelist

Rules:
- Pages and posts are included in the first version.
- Other collections are out of scope unless future planning expands them.

## Relationships

- One `pages` document can produce one `Search Index Entry`.
- One `posts` document can produce one `Search Index Entry`.
- One `Search Index Entry` can produce many visitor-visible `Search Result` views over
  time as the source content changes.
- One `Search Query` can return zero or many `Search Result` items.

## State Transitions

1. Draft page/post is created.
2. Document is published.
3. Search sync creates or updates the mirrored index entry.
4. Visitor searches and sees the result.
5. Document is unpublished, deleted, or removed from index scope.
6. Search sync removes or updates the mirrored entry so it no longer appears publicly.
