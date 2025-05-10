'use client'

import { AppAbility } from '@semicek-innovations/auth'
import { redirect } from 'next/navigation'

import { useAbility } from '@/app/_providers/ability-provider'
import { useUser } from '@/app/_providers/user-provider'
import Loading from '@/app/loading'

export interface GuardProps {
  children: React.ReactNode
  can?: Parameters<AppAbility['can']>
  cannot?: Parameters<AppAbility['cannot']>
  redirectTo?: string
}

export function Guard({ children, can: canProps, cannot: cannotProps, redirectTo = '/' }: GuardProps) {
  const { isLoading } = useUser()
  const { can, cannot } = useAbility()
  const isAllowed = (!canProps || can(...canProps)) && (!cannotProps || !cannot(...cannotProps))

  if (isLoading) return <Loading isFixed={false} />

  if (!isAllowed) {
    return redirect(redirectTo)
  }

  return <>{children}</>
}
