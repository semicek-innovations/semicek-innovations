'use client'

import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from '@heroui/react'
import { forwardRef } from 'react'

export type ButtonProps = HeroUIButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', color = 'primary', ...rest },
  ref
) {
  return <HeroUIButton ref={ref} type={type} color={color} {...rest} />
})
