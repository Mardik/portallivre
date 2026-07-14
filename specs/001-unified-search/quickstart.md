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

6. Open `Admin > Search Settings`, disable either `pages` or `posts`, save, and confirm
   existing results from that collection disappear from `/search`.

7. Re-enable the collection, open `Admin > Collections > Search Results`, click
   `Reindex`, and confirm previously published content from the re-enabled collection
   returns to `/search`.

8. Submit a blank query and confirm the UI shows a clear non-error state.

9. Navigate the search form and results using only the keyboard and confirm the focus
   order is usable.

10. Measure a representative published search request and confirm the response completes
    within the target threshold:

   ```text
   /search?q=<term>
   ```

   The E2E suite asserts a sub-3-second response for the seeded unified search flow.

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

## Current verification notes

- `pnpm run generate:types` completed successfully after the search schema changes.
- `pnpm run lint` is currently blocked by an existing ESLint configuration error that
  throws `TypeError: Converting circular structure to JSON`.
- `pnpm run test:int` is currently blocked in this environment because Vitest cannot
  resolve `vitest.config.mts` after an access-denied error while loading the config.
- `pnpm run test:e2e` could not start the local app because Payload failed to connect
  to Postgres with the configured `DATABASE_URL` credentials.
- `pnpm run build` completed compilation and TypeScript checks for this feature, then
  stopped on the local `DATABASE_URL` credentials (`password authentication failed for user "postgres"`).
