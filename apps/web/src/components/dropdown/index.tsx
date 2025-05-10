'use client'

import {
  Dropdown as HeroUIDropdown,
  DropdownItem,
  DropdownItemProps as HeroUIDropdownItemProps,
  DropdownMenu,
  DropdownMenuProps as HeroUIDropdownMenuProps,
  DropdownProps as HeroUIDropdownProps,
  DropdownTrigger,
  DropdownTriggerProps as HeroUIDropdownTriggerProps,
  SharedSelection
} from '@heroui/react'
import { forwardRef } from 'react'

export type DropdownItemProps = Omit<HeroUIDropdownItemProps, 'children' | 'key'>
export type DropdownMenuProps = Omit<
  HeroUIDropdownMenuProps,
  'children' | 'selectedKeys' | 'disabledKeys' | 'onSelectionChange'
>
export type DropdownTriggerProps = Omit<HeroUIDropdownTriggerProps, 'children'>

export interface DropdownProps<T extends Record<string, any>> extends Omit<HeroUIDropdownProps, 'children'> {
  children: React.ReactNode
  items: T[]
  labelKey: keyof T
  valueKey: keyof T
  selectionMode?: HeroUIDropdownMenuProps['selectionMode']
  selectedKeys?: HeroUIDropdownMenuProps['selectedKeys'] | ((items: T[]) => HeroUIDropdownMenuProps['selectedKeys'])
  disabledKeys?: HeroUIDropdownMenuProps['disabledKeys'] | ((items: T[]) => HeroUIDropdownMenuProps['disabledKeys'])
  onSelectionChange?: (key: SharedSelection, items: T[]) => void
  renderItem?: (item: T) => React.ReactNode
  triggerProps?: DropdownTriggerProps
  menuProps?: DropdownMenuProps
  itemProps?: DropdownItemProps
}

export const Dropdown = forwardRef(function Dropdown<T extends Record<string, any>>(
  {
    children,
    items,
    labelKey,
    valueKey,
    selectionMode,
    selectedKeys,
    disabledKeys,
    onSelectionChange,
    renderItem,
    triggerProps = {},
    menuProps = {},
    itemProps = {},
    ...props
  }: DropdownProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  function handleSelectionChange(keys: SharedSelection) {
    onSelectionChange?.(keys, items)
  }

  return (
    <HeroUIDropdown ref={ref} {...props}>
      <DropdownTrigger {...triggerProps}>{children}</DropdownTrigger>
      <DropdownMenu
        selectionMode={selectionMode}
        selectedKeys={typeof selectedKeys === 'function' ? selectedKeys(items) : selectedKeys}
        disabledKeys={typeof disabledKeys === 'function' ? disabledKeys(items) : disabledKeys}
        onSelectionChange={handleSelectionChange}
        {...menuProps}
      >
        {items.map(item => (
          <DropdownItem key={item[valueKey]} {...itemProps}>
            {renderItem ? renderItem(item) : item[labelKey]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </HeroUIDropdown>
  )
})
