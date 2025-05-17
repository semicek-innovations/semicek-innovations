'use client'

import { User } from '@semicek-innovations/shared-schemas'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { getUser } from '@/http/auth-get-user'
import { signIn, SignInRequest } from '@/http/sign-in'
import { signUp, SignUpRequest } from '@/http/sign-up'
import { cookies } from '@/lib/cookies'

export interface UserContextProps {
  user?: User
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  signIn: (payload: SignInRequest) => ReturnType<typeof signIn>
  signUp: (payload: SignUpRequest) => ReturnType<typeof signUp>
  signOut: () => void
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
    const response = await signIn(payload)
    if (response.success) setUser(response.user)
    return response
  }, [])

  const handleSignUp = useCallback(async (payload: SignUpRequest) => {
    const response = await signUp(payload)
    if (response.success) setUser(response.user)
    return response
  }, [])

  const handleSignOut = useCallback(() => {
    cookies.delete('token')
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
