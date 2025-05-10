'use client'

import { forwardRef } from 'react'

import { MultiLangText } from '../language'
import { Input, InputProps } from '.'

export type MoneyInputProps = Omit<InputProps, 'type'>

export const moneySymbolTexts = {
  en: '$',
  'pt-BR': 'R$',
  es: '€',
  fr: '€',
  de: '€'
}

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { placeholder = '0.00', startContent, ...rest },
  ref
) {
  return (
    <Input
      ref={ref}
      type="number"
      placeholder={placeholder}
      startContent={
        startContent ?? (
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">
              <MultiLangText texts={moneySymbolTexts} />
            </span>
          </div>
        )
      }
      {...rest}
    />
  )
})
