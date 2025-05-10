'use client'
/* eslint-disable no-use-before-define */

import {
  Selection,
  SortDescriptor,
  TableBodyProps,
  TableCellProps,
  TableColumnProps,
  TableHeaderProps,
  TableProps as HeroUITableProps
} from '@heroui/react'

import { TableColumnSelector } from './column-selector'
import { TableSearch } from './search'

export interface TableHeaderColumn<T extends Record<string, any>> {
  name: string
  uid: keyof T | 'actions'
  type?: 'string' | 'number' | 'date' | 'date-br'
  sortable?: boolean
}

export type TableTopContent<T extends Record<string, any>> = (
  props: {
    TableSearch: typeof TableSearch
    TableColumnSelector: typeof TableColumnSelector
  } & Pick<TableProps<T>, 'items' | 'columns' | 'filterFields' | 'selectedKeys' | 'selectionMode'>
) => React.ReactNode

export type ColumnsProps<T extends Record<string, any>> = {
  [key in keyof T | 'actions']?: Omit<TableColumnProps<T>, 'children' | 'key' | 'allowsSorting'>
}

export type CellsProps<T extends Record<string, any>> = {
  [key in keyof T | 'actions']?: Omit<TableCellProps, 'children'>
}

export interface TableProps<T extends Record<string, any>>
  extends Omit<
    HeroUITableProps,
    | 'children'
    | 'sortDescriptor'
    | 'topContent'
    | 'topContentPlacement'
    | 'bottomContent'
    | 'bottomContentPlacement'
    | 'onSortChange'
    | 'onCellAction'
  > {
  items: T[]
  columns: TableHeaderColumn<T>[]
  filterFields: (keyof T)[]
  rowKey: keyof T
  renderCell(item: T, columnKey: keyof T | 'actions'): React.ReactNode
  initialVisibleColumns: (keyof T | 'actions')[]
  initialSortDescriptor?: SortDescriptor
  selectedKeys?: Selection
  onSelectionChange?(keys: Selection): any
  onSortChange?: (a: T, b: T, columnKey: keyof T, isDescending: boolean) => number | null | undefined | void
  onCellAction?(key: string, cell: string): void
  topContent?: TableTopContent<T>
  headerProps?: Omit<TableHeaderProps<T>, 'children' | 'columns'>
  bodyProps?: Omit<TableBodyProps<T>, 'children' | 'items'>
  columnsProps?: ColumnsProps<T>
  cellsProps?: CellsProps<T>
  rowsPerPage?: number
}
