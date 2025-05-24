import { Injectable } from '@nestjs/common'
import { SubscriptionPlan } from '@prisma/client'
import { env } from '@semicek-innovations/env'
import Stripe from 'stripe'

import { PrismaService } from '../prisma/prisma.service'

const planByPriceId: Record<string, SubscriptionPlan> = {
  [env.STRIPE_PRO_PRICE_ID]: 'PRO',
  [env.STRIPE_PREMIUM_PRICE_ID]: 'PREMIUM'
}

export interface CreateSubscriptionCheckoutSessionParams {
  userId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}

@Injectable()
export class StripeService {
  private readonly stripe: Stripe

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' })
  }

  get client() {
    return this.stripe
  }

  async getCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId)
  }

  async createCustomerIfMissing(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } })
    if (user.stripeCustomerId) return user.stripeCustomerId

    const customer = await this.stripe.customers.create({ email: user.email, metadata: { userId } })

    await this.prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } })

    return customer.id
  }

  async createCustomerPortalSession(customerId: string, returnUrl: string) {
    return this.stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl })
  }

  getPlanFromPriceId(priceId: string) {
    const plan = planByPriceId[priceId]
    if (!plan) throw new Error(`No subscription plan for price ID: ${priceId}`)
    return plan
  }

  async createSubscriptionCheckoutSession({
    userId,
    priceId,
    successUrl,
    cancelUrl
  }: CreateSubscriptionCheckoutSessionParams) {
    const customer = await this.createCustomerIfMissing(userId)
    const sessions = await this.stripe.checkout.sessions.list({ customer })
    const reusableSession = sessions.data.find(
      session =>
        session.client_reference_id === userId &&
        session.mode === 'subscription' &&
        session.status === 'open' &&
        session.expires_at * 1000 > Date.now()
    )

    if (reusableSession) return reusableSession

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer,
      client_reference_id: userId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId },
      subscription_data: { metadata: { userId } }
    })

    // Update stripeSubId after payment is successful
    await this.prisma.subscription.create({
      data: { userId, stripeSubId: session.id, priceId, plan: this.getPlanFromPriceId(priceId), status: 'INCOMPLETE' }
    })

    return session
  }

  constructEventFromWebhook(payload: Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET)
  }
}
