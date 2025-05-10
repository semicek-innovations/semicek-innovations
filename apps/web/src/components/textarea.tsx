'use client'

import { Textarea as HeroUITextarea, TextAreaProps as HeroUITextAreaProps } from '@heroui/react'
import { forwardRef } from 'react'

export type TextAreaProps = HeroUITextAreaProps

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function Textarea({ isInvalid, ...rest }, ref) {
  return <HeroUITextarea ref={ref} isInvalid={isInvalid ?? !!rest.errorMessage} {...rest} />
})
