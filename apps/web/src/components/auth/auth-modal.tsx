'use client'

import { useState } from 'react'

import { useLanguage } from '@/app/_providers/language-provider'
import { MultiLangText } from '@/components/language'
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

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setIsLogin(true)
    }
    onOpenChange(isOpen)
  }

  return (
    <Modal
      title={multiLangText(isLogin ? authModalTexts.titleLogin : authModalTexts.titleRegister)}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      classNames={{ header: 'pb-0' }}
      fullScreen={false}
      backdrop="blur"
      size="sm"
    >
      <Modal.Body className="p-6">
        <Form onSuccess={() => onOpenChange(false)}>
          <div className="-mt-2 flex flex-col">
            {isLogin && (
              <Link href="/request-password-reset" className="w-fit" isExternal>
                <MultiLangText texts={authModalTexts.forgotPassword} />
              </Link>
            )}
            <Link as="button" type="button" className="w-fit" onPress={() => setIsLogin(prev => !prev)}>
              <MultiLangText texts={isLogin ? authModalTexts.switchToRegister : authModalTexts.switchToLogin} />
            </Link>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
