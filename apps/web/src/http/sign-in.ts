import { LoginPayload } from '@semicek-innovations/shared-schemas'

import { cookies } from '@/lib/cookies'
import { getErrors } from '@/lib/get-http-errors'

import { api } from './api-client'
import { getUser } from './auth-get-user'

export interface SignInRequest extends LoginPayload {}

export interface SignInResponse {
  token: string
}

export async function signIn({ username, password }: SignInRequest) {
  try {
    const result = await api.post('auth/login', { json: { username, password } }).json<SignInResponse>()
    cookies.set('token', result.token)
    const user = await getUser()
    return { success: true, user } as const
  } catch (error: any) {
    return getErrors(error)
  }
}
