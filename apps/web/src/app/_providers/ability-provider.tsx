'use client'

import { AppAbility, getUserPermissions } from '@semicek-innovations/auth'
import { createContext, useContext } from 'react'

import { useUser } from './user-provider'

export const AbilityContext = createContext<AppAbility>({} as AppAbility)
export const useAbility = () => useContext(AbilityContext)

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const ability = getUserPermissions(user?.id ?? 0, user?.role ?? 'ANONYMOUS')

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}
