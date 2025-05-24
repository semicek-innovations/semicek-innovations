import { z } from 'zod'

export const SubscriptionPlanSchema = z.enum(['FREE', 'PRO', 'PREMIUM'])
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>

export const SubscriptionStatusSchema = z.enum([
  'INCOMPLETE',
  'INCOMPLETE_EXPIRED',
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
  'CANCELED',
  'UNPAID'
])
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>

export const SubscriptionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  stripeSubId: z.string(),
  priceId: z.string(),
  plan: SubscriptionPlanSchema,
  status: SubscriptionStatusSchema,
  currentPeriodEnd: z.coerce.date()
})
export type Subscription = z.infer<typeof SubscriptionSchema>

export const CreateCheckoutSessionSchema = z.object({
  priceId: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url()
})
export type CreateCheckoutSession = z.infer<typeof CreateCheckoutSessionSchema>
