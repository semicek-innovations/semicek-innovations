'use server'

import { signUp, SignUpRequest } from '@/http/sign-up'
import { getErrors } from '@/lib/get-http-errors'

import { signInAction } from './sign-in'

export async function signUpAction(payload: SignUpRequest) {
  try {
    await signUp(payload)
    return await signInAction({ username: payload.username, password: payload.password })
  } catch (error: any) {
    return getErrors(error)
  }
}
