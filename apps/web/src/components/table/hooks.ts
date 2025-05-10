'use client'

import { Selection, SortDescriptor } from '@heroui/react'
import { useContext, useMemo, useState } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { search } from '@/lib/string'

import { TableContext, TableContextType } from './context'
import { TableProps } from './types'

export function useTable() {
  const context = useContext(TableContext)
  if (!context) throw new Error('useTable must be used within a TableProvider')
  return context
}

interface TableContextProps {
  rowsPerPage?: number
}

export function useTableContext(props: TableContextProps = {}): TableContextType {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 10)
  const [columns, setColumns] = useState<Selection>(new Set([]) as Selection)
  const [searchValue, setSearchValue] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState({} as SortDescriptor)

  return {
    page,
    rowsPerPage,
    columns,
    searchValue,
    sortDescriptor,
    setPage,
    setRowsPerPage,
    setColumns,
    setSearchValue,
    setSortDescriptor
  }
}

interface TableValues<T extends Record<string, any>>
  extends Pick<
    TableProps<T>,
    'items' | 'rowKey' | 'columns' | 'initialVisibleColumns' | 'filterFields' | 'initialSortDescriptor' | 'onSortChange'
  > {
  tableContext: TableContextType
}

export function useTableValues<T extends Record<string, any>>({
  items,
  rowKey,
  columns: initialColumns,
  initialVisibleColumns,
  filterFields,
  initialSortDescriptor,
  tableContext,
  onSortChange
}: TableValues<T>) {
  const { page, rowsPerPage, columns, searchValue, sortDescriptor, setColumns, setSortDescriptor } = tableContext

  const isMounted = useIsMounted(() => {
    setColumns(new Set(initialVisibleColumns as any))
    setSortDescriptor(initialSortDescriptor || { column: rowKey as string, direction: 'ascending' })
  })

  const filteredItems = useMemo(() => {
    let filtered = [...items]

    if (searchValue) {
      filtered = search(filtered, filterFields, searchValue)
    }

    return filtered
  }, [filterFields, searchValue, items])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const visibleItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...visibleItems].sort((a, b) => {
      const columnKey = sortDescriptor.column as keyof T
      const isDescending = sortDescriptor.direction === 'descending'
      const sort = onSortChange?.(a, b, columnKey, isDescending)

      if (typeof sort === 'number') return sort

      const first = a[columnKey as keyof typeof a]
      const second = b[columnKey as keyof typeof b]
      let cmp = 0

      const { type } = initialColumns.find(c => c.uid === columnKey) ?? {}

      switch (type) {
        case 'number':
          cmp = Math.sign(Number(first) - Number(second))
          break
        case 'date':
          const dateA = new Date(first as string)
          const dateB = new Date(second as string)
          cmp = dateA.getTime() < dateB.getTime() ? -1 : dateA.getTime() > dateB.getTime() ? 1 : 0
          break
        default:
          cmp = first < second ? -1 : first > second ? 1 : 0
          break
      }

      return isDescending ? -cmp : cmp
    })
  }, [initialColumns, onSortChange, sortDescriptor.column, sortDescriptor.direction, visibleItems])

  const headerColumns = useMemo(() => {
    if (columns === 'all') return initialColumns

    return initialColumns.filter(column => Array.from(columns).includes(column.uid as any))
  }, [initialColumns, columns])

  return { isMounted, pages, filteredItems, sortedItems, headerColumns }
}
