'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from 'next-themes'

import { ConfirmationModal } from '@/components/modal'

import { AbilityProvider } from './ability-provider'
import { LanguageProvider } from './language-provider'
import { UserProvider } from './user-provider'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <LanguageProvider>
      <UserProvider>
        <AbilityProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <HeroUIProvider navigate={router.push} className="flex h-[100dvh] grow flex-col">
              {children}
              <ConfirmationModal />
              <ToastProvider />
            </HeroUIProvider>
          </ThemeProvider>
        </AbilityProvider>
      </UserProvider>
    </LanguageProvider>
  )
}
