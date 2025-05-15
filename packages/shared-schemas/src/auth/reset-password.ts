import { z } from 'zod'

import { INVALID_EMAIL, PASSWORDS_DO_NOT_MATCH, passwordSchema } from '../users'
import { RESET_TOKEN_INVALID_TYPE, RESET_TOKEN_REQUIRED } from './messages'

export const requestPasswordResetSchema = z.object({
  email: z.string({ message: INVALID_EMAIL }).email({ message: INVALID_EMAIL })
})
requestPasswordResetSchema._def.name = 'RequestPasswordResetSchema'

export type RequestPasswordResetPayload = z.infer<typeof requestPasswordResetSchema>

export const resetPasswordSchema = z.object({
  token: z
    .string({ required_error: RESET_TOKEN_REQUIRED, invalid_type_error: RESET_TOKEN_INVALID_TYPE })
    .min(1, { message: RESET_TOKEN_REQUIRED }),
  newPassword: passwordSchema
})
resetPasswordSchema._def.name = 'ResetPasswordSchema'

export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>

export const resetPasswordWithConfirmSchema = resetPasswordSchema
  .extend({
    confirmPassword: passwordSchema
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: PASSWORDS_DO_NOT_MATCH,
    path: ['confirmPassword']
  })
resetPasswordWithConfirmSchema._def.name = 'ResetPasswordWithConfirmSchema'

export type ResetPasswordWithConfirmPayload = z.infer<typeof resetPasswordWithConfirmSchema>
