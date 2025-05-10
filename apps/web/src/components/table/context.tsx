'use client'

import { Selection, SortDescriptor } from '@heroui/react'
import { createContext } from 'react'

export type TableContextType = {
  page: number
  rowsPerPage: number
  columns: Selection
  searchValue: string
  sortDescriptor: SortDescriptor
  setPage(page: number): void
  setRowsPerPage(rowsPerPage: number): void
  setColumns(columns: Selection): void
  setSearchValue(search: string): void
  setSortDescriptor(descriptor: SortDescriptor): void
}

export const TableContext = createContext<TableContextType>({} as TableContextType)
