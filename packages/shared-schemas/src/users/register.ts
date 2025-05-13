import { z } from 'zod'

import { userSchemaWithPassword } from './user'

export const registerSchema = userSchemaWithPassword
  .pick({
    email: true,
    password: true,
    name: true,
    username: true,
    role: true
  })
  .partial({
    username: true,
    role: true
  })
registerSchema._def.name = 'RegisterSchema'

export type RegisterPayload = z.infer<typeof registerSchema>
