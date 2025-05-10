'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { forwardRef, useState } from 'react'

import { Input, InputProps } from '.'

type PasswordType = 'password' | 'text'

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(function PasswordInput(
  { placeholder = '********', endContent, ...rest },
  ref
) {
  const [inputPasswordType, setInputPasswordType] = useState<PasswordType>('password')

  function togglePasswordType() {
    setInputPasswordType(inputPasswordType === 'password' ? 'text' : 'password')
  }

  const PasswordIcon = inputPasswordType === 'password' ? EyeIcon : EyeSlashIcon

  return (
    <Input
      ref={ref}
      type={inputPasswordType}
      placeholder={placeholder}
      endContent={
        endContent || (
          <PasswordIcon className="h-full w-5 shrink-0 cursor-pointer text-default-400" onClick={togglePasswordType} />
        )
      }
      {...rest}
    />
  )
})
