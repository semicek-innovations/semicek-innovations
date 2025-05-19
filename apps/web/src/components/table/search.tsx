'use client'

import { useCallback } from 'react'

import { useLanguage } from '@/app/_providers/language-provider'

import { InputProps } from '../input'
import { SearchInput } from '../input/search'
import { useTable } from './hooks'
import { TableProps } from './types'

export type TableSearchProps<T extends Record<string, any>> = Omit<
  InputProps,
  'value' | 'onValueChange' | 'onClear'
> & {
  filterFields?: TableProps<T>['filterFields']
  columns?: TableProps<T>['columns']
}

export const tableSearchTexts = {
  en: 'Search by',
  'pt-BR': 'Pesquisar por',
  es: 'Buscar por',
  fr: 'Rechercher par',
  de: 'Suchen nach'
}

export const orTexts = {
  en: 'or',
  'pt-BR': 'ou',
  es: 'o',
  fr: 'ou',
  de: 'oder'
}

function formatPlaceholder(fields: (string | number | symbol)[], orText: string): string {
  if (fields.length > 1) {
    return `${fields.slice(0, -1).join(', ')} ${orText} ${String(fields[fields.length - 1])}`
  }
  return String(fields[0])
}

export function TableSearch<T extends Record<string, any>>({
  filterFields,
  columns,
  placeholder,
  classNames,
  ...props
}: TableSearchProps<T>) {
  const { multiLangText } = useLanguage()
  const { searchValue, setSearchValue, setPage } = useTable()

  const onSearchChange = useCallback(
    (value: string) => {
      if (value) {
        setSearchValue(value)
        setPage(1)
      } else {
        setSearchValue('')
      }
    },
    [setPage, setSearchValue]
  )

  const onClear = useCallback(() => {
    setSearchValue('')
    setPage(1)
  }, [setPage, setSearchValue])

  return (
    <SearchInput
      value={searchValue}
      placeholder={
        placeholder ||
        (filterFields && columns
          ? `${multiLangText(tableSearchTexts)} ${formatPlaceholder(
              columns.filter(c => filterFields.some(f => f === c.uid)).map(c => c.name.toLowerCase()),
              multiLangText(orTexts)
            )}`
          : filterFields
            ? `${multiLangText(tableSearchTexts)} ${formatPlaceholder(filterFields, multiLangText(orTexts))}`
            : undefined)
      }
      classNames={{
        ...classNames,
        base: ['w-full sm:max-w-[60%]', classNames?.base]
      }}
      onValueChange={onSearchChange}
      onClear={onClear}
      {...props}
    />
  )
}
