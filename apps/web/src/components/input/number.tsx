'use client'

import { NumberInput as HeroUINumberInput, NumberInputProps as HeroUINumberInputProps } from '@heroui/react'
import { forwardRef } from 'react'

export type NumberInputProps = HeroUINumberInputProps

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { size = 'sm', radius = 'md', isInvalid, ...rest },
  ref
) {
  return (
    <HeroUINumberInput ref={ref} size={size} radius={radius} isInvalid={isInvalid ?? !!rest.errorMessage} {...rest} />
  )
})
