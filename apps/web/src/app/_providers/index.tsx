'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from 'next-themes'

import { ConfirmationModal } from '@/components/modal'

import { AbilityProvider } from './ability-provider'
import { UserProvider } from './user-provider'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <UserProvider>
      <AbilityProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <HeroUIProvider navigate={router.push}>
            {children}
            <ConfirmationModal />
            <ToastProvider />
          </HeroUIProvider>
        </ThemeProvider>
      </AbilityProvider>
    </UserProvider>
  )
}
