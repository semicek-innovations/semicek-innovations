import { z } from 'zod'

export const subscriptionPlans = ['FREE', 'PRO', 'PREMIUM'] as const

export const subscriptionPlanSchema = z.enum(subscriptionPlans, {
  message: `Subscription plan must be one of: ${subscriptionPlans.join(', ')}`
})

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>
