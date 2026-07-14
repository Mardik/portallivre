'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { usePathname, useRouter } from 'next/navigation'

export const Search: React.FC<{ initialValue?: string }> = ({ initialValue = '' }) => {
  const [value, setValue] = useState(initialValue)
  const router = useRouter()
  const pathname = usePathname()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    const normalizedValue = debouncedValue.trim()
    const nextURL = normalizedValue ? `${pathname}?q=${encodeURIComponent(normalizedValue)}` : pathname

    router.replace(nextURL, { scroll: false })
  }, [debouncedValue, pathname, router])

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div role="search" aria-label="Busca no portal">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-3"
      >
        <Label htmlFor="search" className="sr-only">
          Buscar no portal
        </Label>
        <Input
          id="search"
          autoComplete="off"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Busque por termos, páginas ou notícias"
          value={value}
        />
        <button type="submit" className="sr-only">
          buscar
        </button>
        <p className="text-sm text-muted-foreground">
          Os resultados incluem apenas conteúdos públicos publicados.
        </p>
      </form>
    </div>
  )
}
