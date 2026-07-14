import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { SearchResultCardData } from '@/components/Card'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import { getEnabledSearchCollections } from '@/search/config'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const normalizedQuery = query?.trim() || ''
  const payload = await getPayload({ config: configPromise })
  const searchSettings = await getCachedGlobal('search-settings', 0)()
  const enabledCollections = getEnabledSearchCollections(searchSettings)

  const results =
    normalizedQuery && enabledCollections.length > 0
      ? await payload.find({
          collection: 'search',
          depth: 1,
          limit: 12,
          select: {
            title: true,
            slug: true,
            doc: true,
            categories: true,
            meta: true,
          },
          pagination: false,
          where: {
            and: [
              {
                'doc.relationTo': {
                  in: enabledCollections,
                },
              },
              {
                or: [
                  {
                    title: {
                      like: normalizedQuery,
                    },
                  },
                  {
                    'meta.description': {
                      like: normalizedQuery,
                    },
                  },
                  {
                    'meta.title': {
                      like: normalizedQuery,
                    },
                  },
                  {
                    slug: {
                      like: normalizedQuery,
                    },
                  },
                ],
              },
            ],
          },
        })
      : { docs: [], totalDocs: 0 }

  const totalResults = results.docs.length

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">Busca</h1>
            <p className="text-base text-muted-foreground">
              Pesquise em um fluxo unificado por paginas e posts publicados do portal.
            </p>
          </div>

          <Search initialValue={normalizedQuery} />

          <p aria-live="polite" className="text-sm text-muted-foreground">
            {!normalizedQuery
              ? 'Digite um termo para iniciar a busca.'
              : totalResults > 0
                ? `${totalResults} resultado${totalResults === 1 ? '' : 's'} encontrado${
                    totalResults === 1 ? '' : 's'
                  } para "${normalizedQuery}".`
                : `Nenhum resultado encontrado para "${normalizedQuery}".`}
          </p>
        </div>
      </div>

      {totalResults > 0 ? (
        <CollectionArchive results={results.docs as SearchResultCardData[]} />
      ) : normalizedQuery ? (
        <div className="container text-center text-muted-foreground">
          Tente outro termo ou ajuste o escopo indexado no Painel para atualizar o indice.
        </div>
      ) : (
        <div className="container text-center text-muted-foreground">
          Os resultados aparecem aqui assim que voce informar um termo.
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Search`,
  }
}
