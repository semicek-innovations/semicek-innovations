import { RequestPasswordResetPayload } from '@semicek-innovations/shared-schemas'

import { getErrors } from '@/lib/get-http-errors'

import { api } from './api-client'

export interface RequestPasswordResetRequest extends RequestPasswordResetPayload {}

export interface RequestPasswordResetResponse {
  message: string
}

export async function requestPasswordReset(payload: RequestPasswordResetRequest) {
  try {
    const response = await api
      .post('auth/request-password-reset', { json: payload })
      .json<RequestPasswordResetResponse>()
    return { success: true, ...response } as const
  } catch (error: any) {
    return getErrors(error)
  }
}
