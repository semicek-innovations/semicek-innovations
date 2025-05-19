'use client'

import { PressEvent } from '@heroui/react'
import { forwardRef, useState } from 'react'

import { useUser } from '@/app/_providers/user-provider'

import { Button, ButtonProps } from '../button'
import { MultiLangText } from '../language'
import { AuthModal } from './auth-modal'

export type AuthButtonProps = Omit<ButtonProps, 'isLoading'>

export const authButtonTexts = {
  signIn: {
    en: 'Sign In',
    'pt-BR': 'Entrar',
    es: 'Iniciar sesión',
    fr: 'Se connecter',
    de: 'Anmelden'
  },
  signOut: {
    en: 'Sign Out',
    'pt-BR': 'Sair',
    es: 'Cerrar sesión',
    fr: 'Se déconnecter',
    de: 'Abmelden'
  }
}

export const AuthButton = forwardRef<HTMLButtonElement, ButtonProps>(function AuthButton(
  { children, variant = 'flat', onPress, ...rest },
  ref
) {
  const { user, signOut, isLoading } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handlePress(e: PressEvent) {
    if (isLoading) return
    if (user) {
      setIsSigningOut(true)
      await signOut()
      setIsSigningOut(false)
    } else {
      setIsOpen(true)
    }
    onPress?.(e)
  }

  return (
    <>
      <Button ref={ref} variant={variant} onPress={handlePress} isLoading={isSigningOut || isLoading} {...rest}>
        {isLoading
          ? null
          : (children ?? <MultiLangText texts={user ? authButtonTexts.signOut : authButtonTexts.signIn} />)}
      </Button>
      <AuthModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
})
