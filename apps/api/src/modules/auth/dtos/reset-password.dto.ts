import {
  requestPasswordResetSchema,
  resetPasswordSchema,
  resetPasswordWithConfirmSchema
} from '@semicek-innovations/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/common/zod/create-zod-dto'

export class RequestPasswordResetDto extends createZodDto(requestPasswordResetSchema) {}
export interface RequestPasswordResetDto extends z.infer<typeof requestPasswordResetSchema> {}

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
export interface ResetPasswordDto extends z.infer<typeof resetPasswordSchema> {}

export class ResetPasswordWithConfirmDto extends createZodDto(resetPasswordWithConfirmSchema) {}
export interface ResetPasswordWithConfirmDto extends z.infer<typeof resetPasswordWithConfirmSchema> {}
