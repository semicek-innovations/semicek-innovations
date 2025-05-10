import { RegisterPayload, User } from '@semicek-innovations/shared-schemas'

import { api } from './api-client'

export interface SignUpRequest extends RegisterPayload {}

export interface SignUpResponse extends User {}

export async function signUp(payload: SignUpRequest) {
  const result = await api.post('users/register', { json: payload }).json<SignUpResponse>()
  return result
}
