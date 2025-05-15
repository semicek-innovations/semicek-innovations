import { roleSchema, subscriptionPlanSchema } from '@semicek-innovations/auth'
import { z } from 'zod'

import {
  AVATAR_URL_INVALID,
  AVATAR_URL_INVALID_TYPE,
  BIRTHDATE_INVALID_TYPE,
  CREATED_AT_INVALID_TYPE,
  CREATED_AT_REQUIRED,
  ID_INVALID_TYPE,
  ID_REQUIRED,
  INVALID_EMAIL,
  IS_ACTIVE_INVALID_TYPE,
  IS_ACTIVE_REQUIRED,
  NAME_INVALID_TYPE,
  NAME_REQUIRED,
  NAME_TOO_LONG,
  NAME_TOO_SHORT,
  PASSWORD_INVALID_TYPE,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  PREFERENCES_INVALID_TYPE,
  SUBSCRIPTION_ENDS_INVALID_TYPE,
  UPDATED_AT_INVALID_TYPE,
  UPDATED_AT_REQUIRED,
  USERNAME_CONSECUTIVE_PERIODS,
  USERNAME_CONSECUTIVE_UNDERSCORES,
  USERNAME_END_INVALID,
  USERNAME_INVALID_CHARS,
  USERNAME_INVALID_TYPE,
  USERNAME_START_INVALID,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT
} from './messages'

export const usernameSchema = z
  .string({ invalid_type_error: USERNAME_INVALID_TYPE })
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
  id: z.string({ required_error: ID_REQUIRED, invalid_type_error: ID_INVALID_TYPE }),
  email: z.string({ message: INVALID_EMAIL }).email({ message: INVALID_EMAIL }),
  name: z
    .string({ required_error: NAME_REQUIRED, invalid_type_error: NAME_INVALID_TYPE })
    .min(2, { message: NAME_TOO_SHORT })
    .max(100, { message: NAME_TOO_LONG }),
  username: usernameSchema,
  birthdate: z.string({ invalid_type_error: BIRTHDATE_INVALID_TYPE }).optional(),
  avatarUrl: z.string({ invalid_type_error: AVATAR_URL_INVALID_TYPE }).url({ message: AVATAR_URL_INVALID }).optional(),
  preferences: z.record(z.any(), { invalid_type_error: PREFERENCES_INVALID_TYPE }).optional(),
  role: roleSchema,
  subscriptionPlan: subscriptionPlanSchema,
  subscriptionEnds: z.string({ invalid_type_error: SUBSCRIPTION_ENDS_INVALID_TYPE }).optional(),
  isActive: z.boolean({ required_error: IS_ACTIVE_REQUIRED, invalid_type_error: IS_ACTIVE_INVALID_TYPE }),
  createdAt: z.string({ required_error: CREATED_AT_REQUIRED, invalid_type_error: CREATED_AT_INVALID_TYPE }),
  updatedAt: z.string({ required_error: UPDATED_AT_REQUIRED, invalid_type_error: UPDATED_AT_INVALID_TYPE })
})

export const passwordSchema = z
  .string({ required_error: PASSWORD_REQUIRED, invalid_type_error: PASSWORD_INVALID_TYPE })
  .trim()
  .min(8, { message: PASSWORD_TOO_SHORT })
  .max(64, { message: PASSWORD_TOO_LONG })

export const userSchemaWithPassword = userSchema.extend({
  password: passwordSchema
})

export type User = z.infer<typeof userSchema>
export type UserWithPassword = z.infer<typeof userSchemaWithPassword>
