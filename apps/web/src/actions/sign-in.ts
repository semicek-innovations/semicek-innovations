'use server'

import { getUser } from '@/http/auth-get-user'
import { signIn, SignInRequest } from '@/http/sign-in'
import { cookies } from '@/lib/cookies'
import { getErrors } from '@/lib/get-http-errors'

export async function signInAction({ username, password }: SignInRequest) {
  try {
    const result = await signIn({ username, password })
    const [serverCookies] = await cookies.server()
    serverCookies.set('token', result.token)
    const user = await getUser()
    return { success: true, user } as const
  } catch (error: any) {
    return getErrors(error)
  }
}
