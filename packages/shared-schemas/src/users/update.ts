import { z } from 'zod'

import { userSchemaWithPassword } from './user'

export const updateSchema = userSchemaWithPassword
  .pick({
    email: true,
    password: true,
    name: true,
    username: true,
    birthdate: true,
    avatarUrl: true,
    preferences: true,
    role: true
  })
  .partial()
updateSchema._def.name = 'UpdateSchema'

export type UpdatePayload = z.infer<typeof updateSchema>
