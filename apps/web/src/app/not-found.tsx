'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/button'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { multiLangText } from '@/lib/i18n'

import { notFoundTexts } from './consts'

export default function NotFound() {
  const isMounted = useIsMounted()
  if (!isMounted) return null

  return (
    <main className="flex h-[100dvh] w-screen flex-col items-center justify-center p-6 text-foreground">
      <motion.h1
        className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-7xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {multiLangText(notFoundTexts.title)}
      </motion.h1>

      <motion.p
        className="mt-4 max-w-md text-center text-large text-default-400 md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {multiLangText(notFoundTexts.description)}
      </motion.p>

      <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Button size="lg" variant="ghost" as={Link} href="/">
          <ArrowLeftIcon width={18} />
          {multiLangText(notFoundTexts.backToHome)}
        </Button>
      </motion.div>
    </main>
  )
}
