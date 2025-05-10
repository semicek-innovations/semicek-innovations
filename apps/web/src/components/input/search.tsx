'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { forwardRef } from 'react'

import { useLanguage } from '../language'
import { Input, InputProps } from '.'

export const searchPlaceholderTexts = {
  en: 'Search...',
  'pt-BR': 'Buscar...',
  es: 'Buscar...',
  fr: 'Rechercher...',
  de: 'Suchen...'
}

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(function SearchInput(
  { type = 'text', placeholder, startContent, ...props },
  ref
) {
  const { multiLangText } = useLanguage()

  return (
    <Input
      ref={ref}
      type={type}
      placeholder={placeholder ?? multiLangText(searchPlaceholderTexts)}
      startContent={startContent || <MagnifyingGlassIcon className="shrink-0" width={18} height={18} />}
      {...props}
    />
  )
})
