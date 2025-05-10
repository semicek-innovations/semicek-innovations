'use client'

import { User } from '@semicek-innovations/shared-schemas'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { signInAction } from '@/actions/sign-in'
import { signOutAction } from '@/actions/sign-out'
import { signUpAction } from '@/actions/sign-up'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { getUser } from '@/http/auth-get-user'
import { SignInRequest } from '@/http/sign-in'
import { SignUpRequest } from '@/http/sign-up'
import { cookies } from '@/lib/cookies'

export interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (payload: SignInRequest) => ReturnType<typeof signInAction>
  signUp: (payload: SignUpRequest) => ReturnType<typeof signUpAction>
  signOut: () => Promise<void>
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()

  const isMounted = useIsMounted(async () => {
    if (!cookies.get('token')) return
    try {
      const response = await getUser()
      setUser(response)
    } catch {}
  })

  const handleSignIn = useCallback(async (payload: SignInRequest) => {
    const response = await signInAction(payload)
    if (response.success) setUser(response.user)
    return response
  }, [])

  const handleSignUp = useCallback(async (payload: SignUpRequest) => {
    const response = await signUpAction(payload)
    if (response.success) setUser(response.user)
    return response
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOutAction()
    setUser(undefined)
  }, [])

  return (
    <UserContext.Provider
      value={
        {
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'ADMIN',
          isLoading: !isMounted,
          signIn: handleSignIn,
          signUp: handleSignUp,
          signOut: handleSignOut
        } as UserContextProps
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
