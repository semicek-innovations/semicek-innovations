'use client'

import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordWithConfirmSchema } from '@semicek-innovations/shared-schemas'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { resetPasswordAction } from '@/actions/reset-password'
import { Button } from '@/components/button'
import { PasswordInput } from '@/components/input'
import { MultiLangText, multiLangText } from '@/components/language'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { ResetPasswordRequest } from '@/http/reset-password'

import { resetPasswordPageTexts } from './consts'

export default function ResetPassword() {
  const isMounted = useIsMounted()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordWithConfirmSchema),
    defaultValues: { token }
  })

  async function onSubmit(payload: ResetPasswordRequest) {
    const response = await resetPasswordAction(payload)

    if (!response.success) {
      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (messages && messages.length > 0) {
            setError(field as keyof ResetPasswordRequest, { type: 'manual', message: messages[0] })
          }
        }
      } else {
        addToast({ description: response.message, color: 'danger' })
      }
      throw new Error(response.message)
    }

    reset()
  }

  if (!isMounted) return null
  return (
    <main className="flex max-w-md grow flex-col items-center justify-center">
      {isSubmitSuccessful ? (
        <motion.div
          className="flex flex-col items-center justify-center gap-3 text-center text-xl text-success"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CheckCircleIcon className="h-12 w-12" />
          <MultiLangText texts={resetPasswordPageTexts.success} />
        </motion.div>
      ) : (
        <>
          {/* Heading */}
          <motion.h1
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MultiLangText texts={resetPasswordPageTexts.title} />
          </motion.h1>
          {/* Description */}
          <motion.p
            className="mt-3 text-center text-large text-default-400 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MultiLangText texts={resetPasswordPageTexts.description} />
          </motion.p>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex w-full flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PasswordInput
              label={multiLangText(resetPasswordPageTexts.newPasswordLabel)}
              errorMessage={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <PasswordInput
              label={multiLangText(resetPasswordPageTexts.confirmPasswordLabel)}
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" size="lg" isLoading={isSubmitting} isDisabled={!token}>
              <MultiLangText texts={resetPasswordPageTexts.submit} />
            </Button>
          </motion.form>
        </>
      )}
    </main>
  )
}
