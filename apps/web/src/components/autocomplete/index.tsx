'use client'

import {
  Autocomplete as HeroUIAutocomplete,
  AutocompleteItem,
  AutocompleteItemProps as HeroUIAutocompleteItemProps,
  AutocompleteProps as HeroUIAutocompleteProps
} from '@heroui/react'
import { Key } from '@react-types/shared'
import { forwardRef } from 'react'

export type AutocompleteItemProps = Omit<HeroUIAutocompleteItemProps, 'children' | 'aria-label' | 'key'>

export interface AutocompleteProps<T extends Record<string, any>>
  extends Omit<HeroUIAutocompleteProps, 'children' | 'items' | 'selectedKey' | 'disabledKeys' | 'onSelectionChange'> {
  items: (T & { props?: AutocompleteItemProps })[]
  labelKey: keyof T
  valueKey: keyof T
  onSelectionChange?: (key: Key | null, items: T[]) => void
  selectedKey?: HeroUIAutocompleteProps<T>['selectedKey'] | ((items: T[]) => HeroUIAutocompleteProps<T>['selectedKey'])
  disabledKeys?:
    | HeroUIAutocompleteProps<T>['disabledKeys']
    | ((items: T[]) => HeroUIAutocompleteProps<T>['disabledKeys'])
}

export const Autocomplete = forwardRef(function Autocomplete<T extends Record<string, any>>(
  {
    items,
    labelKey,
    valueKey,
    size = 'sm',
    radius = 'md',
    selectedKey,
    disabledKeys,
    isInvalid,
    onSelectionChange,
    inputProps = {},
    ...rest
  }: AutocompleteProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { classNames: inputClassNames, ...inputPropsRest } = inputProps

  function handleSelectionChange(key: Key | null) {
    onSelectionChange?.(key, items)
  }

  return (
    <HeroUIAutocomplete
      ref={ref}
      size={size}
      radius={radius}
      aria-label={typeof rest.label === 'string' ? rest.label : 'Autocomplete'}
      selectedKey={typeof selectedKey === 'function' ? selectedKey(items) : selectedKey}
      disabledKeys={typeof disabledKeys === 'function' ? disabledKeys(items) : disabledKeys}
      onSelectionChange={handleSelectionChange}
      isInvalid={isInvalid ?? !!rest.errorMessage}
      inputProps={{
        classNames: { ...inputClassNames, label: ['truncate', inputClassNames?.label] },
        ...inputPropsRest
      }}
      {...rest}
    >
      {items.map(item => (
        <AutocompleteItem aria-label={item[labelKey]} key={item[valueKey]} {...item.props}>
          {item[labelKey]}
        </AutocompleteItem>
      ))}
    </HeroUIAutocomplete>
  )
})
