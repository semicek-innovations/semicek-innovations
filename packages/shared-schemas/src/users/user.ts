import { roleSchema } from '@semicek-innovations/auth'
import { z } from 'zod'

import {
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  USERNAME_CONSECUTIVE_PERIODS,
  USERNAME_CONSECUTIVE_UNDERSCORES,
  USERNAME_END_INVALID,
  USERNAME_INVALID_CHARS,
  USERNAME_START_INVALID,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT
} from './messages'

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: USERNAME_TOO_SHORT })
  .max(30, { message: USERNAME_TOO_LONG })
  .regex(/^[a-zA-Z0-9._]+$/, {
    message: USERNAME_INVALID_CHARS
  })
  .regex(/^(?!.*[.]{2,}).*$/, {
    message: USERNAME_CONSECUTIVE_PERIODS
  })
  .regex(/^(?!.*[_]{2,}).*$/, {
    message: USERNAME_CONSECUTIVE_UNDERSCORES
  })
  .regex(/^(?![._]).*$/, {
    message: USERNAME_START_INVALID
  })
  .regex(/.*(?<![._])$/, {
    message: USERNAME_END_INVALID
  })

export const userSchema = z.object({
  id: z.number().int(),
  username: usernameSchema,
  role: roleSchema
})

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: PASSWORD_TOO_SHORT })
  .max(64, { message: PASSWORD_TOO_LONG })

export const userSchemaWithPassword = userSchema.extend({
  password: passwordSchema
})

export type User = z.infer<typeof userSchema>
export type UserWithPassword = z.infer<typeof userSchemaWithPassword>
