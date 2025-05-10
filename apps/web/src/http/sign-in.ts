import { LoginPayload } from '@semicek-innovations/shared-schemas'

import { api } from './api-client'

export interface SignInRequest extends LoginPayload {}

export interface SignInResponse {
  token: string
}

export async function signIn({ username, password }: SignInRequest) {
  const result = await api.post('auth/login', { json: { username, password } }).json<SignInResponse>()
  return result
}
