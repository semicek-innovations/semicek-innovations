import { z } from 'zod'

import { INVALID_EMAIL, passwordSchema } from '../users'

export const requestPasswordResetSchema = z.object({
  email: z.string({ message: INVALID_EMAIL }).email({ message: INVALID_EMAIL })
})
requestPasswordResetSchema._def.name = 'RequestPasswordResetSchema'

export type RequestPasswordResetPayload = z.infer<typeof requestPasswordResetSchema>

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Reset token is required' }),
  newPassword: passwordSchema
})
resetPasswordSchema._def.name = 'ResetPasswordSchema'

export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>

export const resetPasswordWithConfirmSchema = resetPasswordSchema
  .extend({
    confirmPassword: passwordSchema
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
resetPasswordWithConfirmSchema._def.name = 'ResetPasswordWithConfirmSchema'

export type ResetPasswordWithConfirmPayload = z.infer<typeof resetPasswordWithConfirmSchema>
