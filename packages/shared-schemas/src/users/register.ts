import { roleSchema } from '@semicek-innovations/auth'
import { z } from 'zod'

import { passwordSchema, usernameSchema } from './user'

export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  role: roleSchema
})
registerSchema._def.name = 'RegisterSchema'

export type RegisterPayload = z.infer<typeof registerSchema>
