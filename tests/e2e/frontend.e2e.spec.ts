import { test, expect } from '@playwright/test'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'

const sharedTerm = 'termo-busca-unificada-qa'
const pageSlug = 'busca-unificada-pagina-qa'
const postSlug = 'busca-unificada-post-qa'
const draftPostSlug = 'busca-unificada-rascunho-qa'

const richTextWithTerm = {
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: `Conteudo publicado para ${sharedTerm}.`,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
}

test.describe('Frontend', () => {
  test.beforeAll(async () => {
    const payload = await getPayload({ config })

    await payload.updateGlobal({
      slug: 'search-settings',
      data: {
        pagesEnabled: true,
        postsEnabled: true,
      },
    })

    await payload.delete({
      collection: 'pages',
      where: {
        slug: {
          equals: pageSlug,
        },
      },
    })

    await payload.delete({
      collection: 'posts',
      where: {
        slug: {
          in: [postSlug, draftPostSlug],
        },
      },
    })

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Pagina publica da busca unificada',
        slug: pageSlug,
        _status: 'published',
        hero: {
          type: 'none',
        },
        layout: [],
        meta: {
          description: `Descricao publica para ${sharedTerm}.`,
        },
      },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: 'Post publico da busca unificada',
        slug: postSlug,
        _status: 'published',
        content: richTextWithTerm,
        meta: {
          description: `Descricao publica para ${sharedTerm}.`,
        },
      },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: 'Post em rascunho da busca unificada',
        slug: draftPostSlug,
        _status: 'draft',
        content: richTextWithTerm,
        meta: {
          description: `Descricao privada para ${sharedTerm}.`,
        },
      },
    })

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const searchDocs = await payload.find({
        collection: 'search',
        depth: 0,
        limit: 10,
        pagination: false,
        where: {
          slug: {
            in: [pageSlug, postSlug, draftPostSlug],
          },
        },
      })

      const indexedSlugs = searchDocs.docs.map((doc) => doc.slug)
      const hasPublishedDocs = indexedSlugs.includes(pageSlug) && indexedSlugs.includes(postSlug)
      const draftWasExcluded = !indexedSlugs.includes(draftPostSlug)

      if (hasPublishedDocs && draftWasExcluded) {
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    throw new Error('Unified search fixtures were not indexed in time for the E2E suite.')
  })

  test.afterAll(async () => {
    const payload = await getPayload({ config })

    await payload.delete({
      collection: 'pages',
      where: {
        slug: {
          equals: pageSlug,
        },
      },
    })

    await payload.delete({
      collection: 'posts',
      where: {
        slug: {
          in: [postSlug, draftPostSlug],
        },
      },
    })
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Payload Website Template/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Payload Website Template')
  })

  test('shows a clear blank-query state', async ({ page }) => {
    await page.goto('http://localhost:3000/search')

    await expect(page.getByRole('heading', { level: 1, name: 'Busca' })).toBeVisible()
    await expect(page.getByLabel('Buscar no portal')).toBeVisible()
    await expect(page.getByText('Digite um termo para iniciar a busca.')).toBeVisible()
  })

  test('returns unified published results and excludes drafts', async ({ page }) => {
    const startedAt = Date.now()

    await page.goto(`http://localhost:3000/search?q=${sharedTerm}`)

    await expect(page.getByText(`2 resultados encontrados para "${sharedTerm}".`)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pagina publica da busca unificada' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Post publico da busca unificada' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pagina publica da busca unificada' })).toHaveAttribute(
      'href',
      `/${pageSlug}`,
    )
    await expect(page.getByRole('link', { name: 'Post publico da busca unificada' })).toHaveAttribute(
      'href',
      `/posts/${postSlug}`,
    )
    await expect(page.getByText('Post em rascunho da busca unificada')).toHaveCount(0)

    expect(Date.now() - startedAt).toBeLessThan(3000)
  })
})
