'use client'

import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestPasswordResetSchema } from '@semicek-innovations/shared-schemas'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLanguage } from '@/app/_providers/language-provider'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { MultiLangText } from '@/components/language'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { requestPasswordReset, RequestPasswordResetRequest } from '@/http/request-password-reset'

import { requestPasswordResetPageTexts } from './consts'

export default function RequestPasswordReset() {
  const isMounted = useIsMounted()
  const { multiLangText } = useLanguage()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<RequestPasswordResetRequest>({ resolver: zodResolver(requestPasswordResetSchema) })
  const [successText, setSuccessText] = useState('')

  async function onSubmit(payload: RequestPasswordResetRequest) {
    const response = await requestPasswordReset(payload)

    if (!response.success) {
      if (response.errors) {
        for (const [field, messages] of Object.entries(response.errors)) {
          if (messages && messages.length > 0) {
            setError(field as keyof RequestPasswordResetRequest, { type: 'manual', message: messages[0] })
          }
        }
      } else {
        addToast({ description: response.message, color: 'danger' })
      }
      throw new Error(response.message)
    }

    setSuccessText(response.message)
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
          transition={{ delay: 0.3 }}
        >
          <CheckCircleIcon className="h-12 w-12" />
          {successText}
        </motion.div>
      ) : (
        <>
          {/* Heading */}
          <motion.h1
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MultiLangText texts={requestPasswordResetPageTexts.title} />
          </motion.h1>
          {/* Description */}
          <motion.p
            className="mt-3 text-center text-medium text-default-400 md:text-large"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MultiLangText texts={requestPasswordResetPageTexts.description} />
          </motion.p>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex w-full flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              label={multiLangText(requestPasswordResetPageTexts.emailLabel)}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Button type="submit" size="lg" isLoading={isSubmitting}>
              <MultiLangText texts={requestPasswordResetPageTexts.submit} />
            </Button>
          </motion.form>
        </>
      )}
    </main>
  )
}
