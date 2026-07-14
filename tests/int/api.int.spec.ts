import { beforeSyncWithSearch } from '@/search/beforeSync'
import { getEnabledSearchCollections, getSearchResultHref } from '@/search/config'
import { describe, expect, it, vi } from 'vitest'

describe('Unified search helpers', () => {
  it('defaults pages and posts to enabled', () => {
    expect(getEnabledSearchCollections()).toEqual(['pages', 'posts'])
    expect(getEnabledSearchCollections({ postsEnabled: false })).toEqual(['pages'])
    expect(getEnabledSearchCollections({ pagesEnabled: false })).toEqual(['posts'])
  })

  it('builds public hrefs for pages and posts', () => {
    expect(getSearchResultHref({ relationTo: 'pages', slug: 'home' })).toBe('/')
    expect(getSearchResultHref({ relationTo: 'pages', slug: 'contato' })).toBe('/contato')
    expect(getSearchResultHref({ relationTo: 'posts', slug: 'busca-unificada' })).toBe(
      '/posts/busca-unificada',
    )
  })
})

describe('beforeSyncWithSearch', () => {
  it('maps only public fields for posts and mirrors category titles', async () => {
    const findByID = vi.fn().mockResolvedValue({ id: 7, title: 'Noticias' })

    const synced = await beforeSyncWithSearch({
      collectionSlug: 'posts',
      originalDoc: {
        id: 1,
        slug: 'busca-unificada',
        title: 'Busca Unificada',
        categories: [7],
        meta: {
          description: 'Resumo publico',
          image: 2,
        },
      },
      payload: {} as never,
      req: {
        payload: {
          findByID,
        },
      } as never,
      searchDoc: {
        doc: {
          relationTo: 'posts',
          value: 1,
        },
        title: 'Busca Unificada',
      },
    })

    expect(synced).toMatchObject({
      title: 'Busca Unificada',
      slug: 'busca-unificada',
      docRelation: 'posts',
      meta: {
        title: 'Busca Unificada',
        description: 'Resumo publico',
        image: 2,
      },
      categories: [
        {
          relationTo: 'categories',
          categoryID: '7',
          title: 'Noticias',
        },
      ],
    })
    expect(findByID).toHaveBeenCalledOnce()
  })

  it('keeps page results category-free and falls back to seo title', async () => {
    const synced = await beforeSyncWithSearch({
      collectionSlug: 'pages',
      originalDoc: {
        id: 2,
        slug: 'pagina-busca',
        title: 'Pagina Busca',
        meta: {
          title: 'SEO Pagina Busca',
          description: 'Descricao publica',
        },
      },
      payload: {} as never,
      req: {
        payload: {
          findByID: vi.fn(),
        },
      } as never,
      searchDoc: {
        doc: {
          relationTo: 'pages',
          value: 2,
        },
        title: 'Pagina Busca',
      },
    })

    expect(synced).toMatchObject({
      docRelation: 'pages',
      slug: 'pagina-busca',
      meta: {
        title: 'SEO Pagina Busca',
        description: 'Descricao publica',
      },
      categories: [],
    })
  })
})
