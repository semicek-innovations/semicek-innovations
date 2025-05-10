'use client'

import { Input as HeroUIInput, InputProps as HeroUIInputProps } from '@heroui/react'
import { forwardRef, useState } from 'react'

export type InputProps = HeroUIInputProps & {
  mask?(value?: string): string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'sm', radius = 'md', mask, isInvalid, onValueChange, onChange, ...rest },
  ref
) {
  const [value, setValue] = useState('')
  const actualValue = rest.value ?? value
  const actualSetValue = onValueChange ?? setValue

  function handleValueChange(value: string) {
    if (mask) value = mask(value)
    actualSetValue(value)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (mask) e.target.value = mask(e.target.value)
    onChange?.(e)
  }

  return (
    <HeroUIInput
      ref={ref}
      size={size}
      radius={radius}
      value={actualValue}
      isInvalid={isInvalid ?? !!rest.errorMessage}
      onValueChange={handleValueChange}
      onChange={handleOnChange}
      {...rest}
    />
  )
})
