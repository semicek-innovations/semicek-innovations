'use client'

import { useState } from 'react'

import { useLanguage } from '@/components/language'
import { Link } from '@/components/link'
import { Modal } from '@/components/modal'

import { authModalTexts } from './consts'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export * from './consts'

export interface AuthModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const { multiLangText } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)
  const Form = isLogin ? SignInForm : SignUpForm

  return (
    <Modal
      title={multiLangText(isLogin ? authModalTexts.titleLogin : authModalTexts.titleRegister)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      fullScreen={false}
      backdrop="blur"
      size="sm"
    >
      <Form onSuccess={() => onOpenChange(false)}>
        <Link as="button" type="button" color="secondary" onPress={() => setIsLogin(prev => !prev)}>
          {isLogin ? multiLangText(authModalTexts.switchToRegister) : multiLangText(authModalTexts.switchToLogin)}
        </Link>
      </Form>
    </Modal>
  )
}
