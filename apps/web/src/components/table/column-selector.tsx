'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { tv } from '@heroui/react'

import { capitalize } from '@/lib/string'

import { Button, ButtonProps } from '../button'
import { Dropdown, DropdownItemProps, DropdownMenuProps, DropdownProps, DropdownTriggerProps } from '../dropdown'
import { useLanguage } from '../language'
import { useTable } from './hooks'
import { TableProps } from './types'

export interface TableColumnSelectorProps<T extends Record<string, any>>
  extends Pick<TableProps<T>, 'columns'>,
    Omit<DropdownProps<TableProps<T>['columns'][number]>, 'children' | 'items' | 'labelKey' | 'valueKey'> {
  buttonProps?: Omit<ButtonProps, 'ref'>
  triggerProps?: DropdownTriggerProps
  menuProps?: DropdownMenuProps
  itemProps?: DropdownItemProps
}

const tableCloumnSelector = tv({
  slots: {
    trigger: 'flex',
    item: 'capitalize'
  }
})

export const tableColumnSelectorTexts = {
  en: 'Columns',
  'pt-BR': 'Colunas',
  es: 'Columnas',
  fr: 'Colonnes',
  de: 'Spalten'
}

export function TableColumnSelector<T extends Record<string, any>>({
  columns: initialColumns,
  size = 'sm',
  selectionMode = 'multiple',
  closeOnSelect = false,
  triggerProps = {},
  buttonProps = {},
  menuProps = {},
  itemProps = {},
  ...props
}: TableColumnSelectorProps<T>) {
  const { columns, setColumns } = useTable()
  const { className: triggerClassName, ...restTriggerProps } = triggerProps
  const {
    children: buttonChildren,
    size: buttonSize = size,
    color = 'primary',
    variant = 'flat',
    endContent,
    ...restButtonProps
  } = buttonProps
  const { disallowEmptySelection = true, ...restMenuProps } = menuProps
  const { className: itemClassName, ...restItemProps } = itemProps
  const { trigger, item } = tableCloumnSelector()
  const { multiLangText } = useLanguage()

  return (
    <Dropdown
      items={initialColumns}
      labelKey="name"
      valueKey="uid"
      renderItem={item => capitalize(item.name)}
      selectionMode={selectionMode}
      selectedKeys={columns}
      onSelectionChange={setColumns}
      closeOnSelect={closeOnSelect}
      triggerProps={{ className: trigger({ class: triggerClassName }), ...restTriggerProps }}
      menuProps={{ disallowEmptySelection, ...restMenuProps }}
      itemProps={{ className: item({ class: itemClassName }), ...restItemProps }}
      {...props}
    >
      <Button
        size={buttonSize}
        color={color}
        variant={variant}
        endContent={
          endContent || (
            <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform group-aria-[expanded=true]:rotate-180" />
          )
        }
        {...restButtonProps}
      >
        {buttonChildren || multiLangText(tableColumnSelectorTexts)}
      </Button>
    </Dropdown>
  )
}
