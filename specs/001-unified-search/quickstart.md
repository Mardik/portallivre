# Quickstart: Unified Search

## Prerequisites

- PostgreSQL configured through `DATABASE_URL`
- `PAYLOAD_SECRET` set
- Dependencies installed

## Validate the feature locally

1. Run the app:

   ```bash
   pnpm dev
   ```

2. In the Payload admin, create and publish one page and one post that share a clear
   search term in the title or SEO description.

3. Open the public search page:

   ```text
   /search?q=<term>
   ```

4. Confirm the public results page returns both content types in one unified list.

5. Create a draft page or draft post containing the same term and verify it does not
   appear in public search.

6. Remove one collection from the configured index scope and verify the public search
   results change after the index refresh path used by the implementation.

7. Submit a blank query and confirm the UI shows a clear non-error state.

8. Navigate the search form and results using only the keyboard and confirm the focus
   order is usable.

## Maintenance checks

- If collection schemas change, regenerate Payload types:

  ```bash
  pnpm run generate:types
  ```

- Run the project checks before merging:

  ```bash
  pnpm run lint
  pnpm run test:int
  pnpm run test:e2e
  ```
