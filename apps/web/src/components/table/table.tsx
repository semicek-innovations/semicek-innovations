'use client'

import {
  cn,
  Pagination,
  Table as HeroUITable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'
import { useCallback, useMemo } from 'react'

import { useLanguage } from '../language'
import { TableColumnSelector } from './column-selector'
import { TableContext } from './context'
import { useTableContext, useTableValues } from './hooks'
import { TableSearch } from './search'
import { TableHeaderColumn, TableProps } from './types'

export const emptyContentTexts = {
  en: 'No items found',
  'pt-BR': 'Nenhum item encontrado',
  es: 'No se encontraron elementos',
  fr: 'Aucun élément trouvé',
  de: 'Keine Elemente gefunden'
}

export function Table<T extends Record<string, any>>({
  items,
  rowKey,
  columns,
  rowsPerPage,
  filterFields,
  renderCell,
  initialVisibleColumns,
  initialSortDescriptor,
  selectedKeys,
  selectionMode = 'multiple',
  isHeaderSticky = true,
  onSelectionChange,
  onSortChange,
  onCellAction,
  topContent,
  headerProps = {},
  bodyProps = {},
  columnsProps = {},
  cellsProps = {},
  ...rest
}: TableProps<T>) {
  const { multiLangText } = useLanguage()
  const { emptyContent = multiLangText(emptyContentTexts), ...restBodyProps } = bodyProps
  const tableContext = useTableContext({ rowsPerPage })
  const { isMounted, pages, sortedItems, headerColumns } = useTableValues({
    items,
    rowKey,
    columns,
    initialVisibleColumns,
    filterFields,
    initialSortDescriptor,
    tableContext,
    onSortChange
  })

  const handleCellAction = useCallback(
    (key: string | number | bigint) => {
      const [value, cell] = splitKey(key, columns)
      onCellAction?.(value, cell)
    },
    [columns, onCellAction]
  )

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color={rest.color}
          page={tableContext.page}
          total={pages}
          onChange={tableContext.setPage}
        />
      </div>
    )
  }, [tableContext.page, pages, rest.color, tableContext.setPage])

  if (!isMounted) return null
  return (
    <TableContext.Provider value={tableContext}>
      <HeroUITable
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        topContent={topContent?.({
          items,
          columns,
          filterFields,
          selectedKeys,
          selectionMode,
          TableSearch,
          TableColumnSelector
        })}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={tableContext.sortDescriptor}
        onSelectionChange={onSelectionChange}
        onSortChange={tableContext.setSortDescriptor}
        onCellAction={handleCellAction}
        isHeaderSticky={isHeaderSticky}
        {...rest}
      >
        <TableHeader columns={headerColumns} {...headerProps}>
          {column => {
            const { align, className, ...columnProps } = columnsProps[column.uid] ?? {}
            return (
              <TableColumn
                key={column.uid as any}
                align={align ?? (column.uid === 'actions' ? 'center' : 'start')}
                className={cn(column.uid === 'actions' ? 'text-center' : '', className)}
                allowsSorting={column.sortable}
                {...columnProps}
              >
                {column.name}
              </TableColumn>
            )
          }}
        </TableHeader>
        <TableBody emptyContent={emptyContent} items={sortedItems} {...restBodyProps}>
          {item => (
            <TableRow key={item[rowKey]}>
              {columnKey => <TableCell {...cellsProps[columnKey]}>{renderCell(item, columnKey as keyof T)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </HeroUITable>
    </TableContext.Provider>
  )
}

function splitKey<T extends Record<string, any>>(
  key: string | number | bigint,
  columns: TableHeaderColumn<T>[]
): [string, string] {
  key = String(key)
  for (const column of columns) {
    const uid = column.uid.toString()
    if (key.endsWith(uid)) {
      return [key.slice(0, -(uid.length + (key.length - uid.length) / 2)), uid]
    }
  }
  return [key, '']
}
