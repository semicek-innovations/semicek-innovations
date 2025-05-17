'use client'

import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterPayload, registerSchema } from '@semicek-innovations/shared-schemas'

import { useUser } from '@/app/_providers/user-provider'
import { Button } from '@/components/button'
import { Input, PasswordInput } from '@/components/input'
import { MultiLangText, useLanguage } from '@/components/language'
import { authModalTexts } from '@/components/modal'
import { useForm } from '@/hooks/use-form'

export function SignUpForm({ children, onSuccess }: { children: React.ReactNode; onSuccess?: () => void }) {
  const { signUp } = useUser()
  const { multiLangText } = useLanguage()
  const form = useForm<RegisterPayload>({ resolver: zodResolver(registerSchema), defaultValues: { role: 'USER' } })

  async function onSubmit(payload: RegisterPayload) {
    const response = await signUp(payload)

    if (!response.success) {
      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (messages && messages.length > 0) {
            form.setError(field as keyof RegisterPayload, { type: 'manual', message: messages[0] })
          }
        }
      } else {
        addToast({ description: response.message, color: 'danger' })
      }
      return
    }

    onSuccess?.()
    return form.reset()
  }

  return (
    <form autoComplete="off" className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <Input
        label={multiLangText(authModalTexts.emailLabel)}
        placeholder={multiLangText(authModalTexts.emailPlaceholder)}
        errorMessage={form.formState.errors.email?.message}
        isRequired
        {...form.register('email')}
      />
      <Input
        label={multiLangText(authModalTexts.nameLabel)}
        placeholder={multiLangText(authModalTexts.namePlaceholder)}
        errorMessage={form.formState.errors.name?.message}
        isRequired
        {...form.register('name')}
      />
      <Input
        label={multiLangText(authModalTexts.usernameLabel)}
        placeholder={multiLangText(authModalTexts.usernamePlaceholder)}
        errorMessage={form.formState.errors.username?.message}
        {...form.register('username')}
      />
      <PasswordInput
        label={multiLangText(authModalTexts.passwordLabel)}
        placeholder={multiLangText(authModalTexts.passwordPlaceholder)}
        errorMessage={form.formState.errors.password?.message}
        autoComplete="new-password"
        isRequired
        {...form.register('password')}
      />

      {children}
      <div className="flex w-full justify-end">
        <Button type="submit" isLoading={form.formState.isSubmitting}>
          <MultiLangText texts={authModalTexts.registerButton} />
        </Button>
      </div>
    </form>
  )
}
