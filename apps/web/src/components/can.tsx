'use client'

import { createContextualCan } from '@casl/react'

import { AbilityContext } from '@/app/_providers/ability-provider'

export const ContextualCan = createContextualCan(AbilityContext.Consumer)
export type ContextualCanProps = React.ComponentProps<typeof ContextualCan>
export type CanParams = Parameters<NonNullable<ContextualCanProps['ability']>['can']>

export type CanProps = {
  I?: CanParams[0]
  a?: CanParams[1]
}

export function Can({ children, ...can }: CanProps & { children: React.ReactNode }) {
  if (!Object.keys(can).length) return <>{children}</>
  return <ContextualCan {...(can as ContextualCanProps)}>{children}</ContextualCan>
}
