import { ResetPasswordWithConfirmPayload } from '@semicek-innovations/shared-schemas'

import { getErrors } from '@/lib/get-http-errors'

import { api } from './api-client'

export interface ResetPasswordRequest extends ResetPasswordWithConfirmPayload {}

export interface ResetPasswordResponse {
  message: string
}

export async function resetPassword(payload: ResetPasswordRequest) {
  try {
    const response = await api.post('auth/reset-password', { json: payload }).json<ResetPasswordResponse>()
    return { success: true, ...response } as const
  } catch (error: any) {
    return getErrors(error)
  }
}
