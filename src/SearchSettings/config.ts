import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { revalidateSearchSettings } from './hooks/revalidateSearchSettings'

export const SearchSettings: GlobalConfig = {
  slug: 'search-settings',
  access: {
    read: authenticated,
  },
  admin: {
    group: 'Configurações',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'pagesEnabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Indexar páginas',
        },
        {
          name: 'postsEnabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Indexar posts',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSearchSettings],
  },
}
