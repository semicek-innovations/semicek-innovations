'use client'

import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Alert } from '@heroui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/button'
import { MultiLangText } from '@/components/language'

import { errorPageTexts } from './consts'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-6 text-foreground">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ExclamationTriangleIcon width={64} className="text-warning" />

        <h1 className="text-center text-2xl font-semibold md:text-3xl">
          <MultiLangText texts={errorPageTexts.title} />
        </h1>

        <p className="max-w-md text-center text-default-400">
          <MultiLangText texts={errorPageTexts.description} />
        </p>

        {process.env.NODE_ENV === 'development' && <Alert color="danger">{error.message}</Alert>}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="ghost" color="warning" onPress={() => reset()}>
            <ArrowPathIcon width={18} />
            <MultiLangText texts={errorPageTexts.tryAgain} />
          </Button>

          <Button size="lg" variant="ghost" as={Link} href="/">
            <MultiLangText texts={errorPageTexts.backToHome} />
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
