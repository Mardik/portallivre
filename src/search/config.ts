import type { Config, Search } from '@/payload-types'
import type { Payload } from 'payload'

export const supportedSearchCollections = ['pages', 'posts'] as const

export type SupportedSearchCollection = (typeof supportedSearchCollections)[number]

export const searchSettingsSlug = 'search-settings' satisfies keyof Config['globals']

type SearchSettings = Config['globals'][typeof searchSettingsSlug]

export const getSearchSettings = async (payload: Payload): Promise<SearchSettings> => {
  return payload.findGlobal({
    slug: searchSettingsSlug,
    depth: 0,
  })
}

export const getEnabledSearchCollections = (
  settings?: Partial<SearchSettings> | null,
): SupportedSearchCollection[] => {
  const enabledCollections: SupportedSearchCollection[] = []

  if (settings?.pagesEnabled !== false) {
    enabledCollections.push('pages')
  }

  if (settings?.postsEnabled !== false) {
    enabledCollections.push('posts')
  }

  return enabledCollections
}

export const isSupportedSearchCollection = (
  value: string,
): value is SupportedSearchCollection => {
  return supportedSearchCollections.includes(value as SupportedSearchCollection)
}

export const getSearchResultHref = ({
  relationTo,
  slug,
}: {
  relationTo: Search['doc']['relationTo']
  slug?: string | null
}) => {
  if (!slug) {
    return '#'
  }

  if (relationTo === 'pages') {
    return slug === 'home' ? '/' : `/${slug}`
  }

  return `/posts/${slug}`
}
