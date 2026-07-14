# Public Search Contract

## Surface

- Route: `GET /search`
- Query string: `q`

## Input Contract

- `q` contains the visitor search term.
- Empty or whitespace-only values must not expose an error state.
- Search terms are treated as public visitor input, not admin commands.

## Output Contract

- The page shows a unified list of matching published portal content.
- Initial index scope includes `pages` and `posts`.
- Draft, unpublished, restricted, and internal records must not appear.
- No-results states must be readable and accessible.

## Result Contract

Each result should provide:
- A public title
- A public destination URL
- A short public description when available
- A content-type hint only if it helps the visitor understand the result

## Accessibility Contract

- The search input must have an accessible label.
- Keyboard-only submission must work.
- Focus states must be visible.
- Empty and no-results states must be announced or clearly readable.
- Portuguese content and accent behavior must remain understandable for portal users.
