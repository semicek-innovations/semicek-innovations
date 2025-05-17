'use server'

import { resetPassword, ResetPasswordRequest } from '@/http/reset-password'
import { getErrors } from '@/lib/get-http-errors'

export async function resetPasswordAction(payload: ResetPasswordRequest) {
  try {
    const response = await resetPassword(payload)
    return { success: true, ...response } as const
  } catch (error: any) {
    return getErrors(error)
  }
}
