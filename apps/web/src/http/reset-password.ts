import { ResetPasswordWithConfirmPayload } from '@semicek-innovations/shared-schemas'

import { api } from './api-client'

export interface ResetPasswordRequest extends ResetPasswordWithConfirmPayload {}

export interface ResetPasswordResponse {
  message: string
}

export async function resetPassword(payload: ResetPasswordRequest) {
  const result = await api.post('auth/reset-password', { json: payload }).json<ResetPasswordResponse>()
  return result
}
