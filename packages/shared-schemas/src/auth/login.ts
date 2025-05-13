import { z } from 'zod'

import { INVALID_EMAIL, passwordSchema, usernameSchema } from '../users'

export const loginSchema = z.object({
  username: usernameSchema.or(z.string({ message: INVALID_EMAIL }).email({ message: INVALID_EMAIL })),
  password: passwordSchema
})
loginSchema._def.name = 'LoginSchema'

export type LoginPayload = z.infer<typeof loginSchema>
