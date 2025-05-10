import { z } from 'zod'

import { passwordSchema, usernameSchema } from '../users'

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
})
loginSchema._def.name = 'LoginSchema'

export type LoginPayload = z.infer<typeof loginSchema>
