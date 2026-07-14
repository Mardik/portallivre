import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { getEnabledSearchCollections, supportedSearchCollections } from '@/search/config'

export const revalidateSearchSettings: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  const { payload, context } = req

  if (!context.disableRevalidate) {
    const enabledCollections = new Set(getEnabledSearchCollections(doc))

    await Promise.all(
      supportedSearchCollections
        .filter((collection) => !enabledCollections.has(collection))
        .map((collection) =>
          payload.db.deleteMany({
            collection: 'search',
            req,
            where: {
              'doc.relationTo': {
                equals: collection,
              },
            },
          }),
        ),
    )

    payload.logger.info('Revalidating search settings and unified search results')

    revalidatePath('/search')
    revalidateTag('global_search-settings', 'max')
  }

  return doc
}
