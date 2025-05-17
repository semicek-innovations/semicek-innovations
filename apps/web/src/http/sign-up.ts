import { RegisterPayload, User } from '@semicek-innovations/shared-schemas'

import { getErrors } from '@/lib/get-http-errors'

import { api } from './api-client'
import { signIn } from './sign-in'

export interface SignUpRequest extends RegisterPayload {}

export interface SignUpResponse extends User {}

export async function signUp(payload: SignUpRequest) {
  try {
    await api.post('users/register', { json: payload }).json<SignUpResponse>()
    return await signIn({ username: payload.email, password: payload.password })
  } catch (error: any) {
    return getErrors(error)
  }
}
