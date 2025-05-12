import { z } from 'zod'

import { roleSchema } from '../roles'
import { subscriptionPlanSchema } from '../subscription-plans'

export const userSchema = z.object({
  __typename: z.literal('User').default('User'),
  id: z.string(),
  role: roleSchema,
  subscriptionPlan: subscriptionPlanSchema
})

export type User = z.infer<typeof userSchema>
