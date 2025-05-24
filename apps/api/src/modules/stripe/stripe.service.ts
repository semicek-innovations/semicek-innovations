import { Injectable } from '@nestjs/common'
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client'
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

  get prices() {
    return { PRO: env.STRIPE_PRO_PRICE_ID, PREMIUM: env.STRIPE_PREMIUM_PRICE_ID }
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

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId
    if (session.mode !== 'subscription' || !userId) return

    const stripeSubId = session.subscription as string
    const priceId = session.line_items?.[0]?.price.id ?? session.metadata?.priceId
    const sub = await this.stripe.subscriptions.retrieve(stripeSubId)
    const plan = this.getPlanFromPriceId(priceId)
    const status = sub.status.toUpperCase() as SubscriptionStatus

    return await this.prisma.subscription.upsert({
      where: { stripeSubId: session.id },
      update: { userId, stripeSubId, priceId, plan, status },
      create: { userId, stripeSubId, priceId, plan, status }
    })
  }

  async handleSubscriptionUpdatedOrDeleted(sub: Stripe.Subscription) {
    const userId = sub.metadata?.userId
    if (!userId) return

    const priceId = sub.items.data[0]?.price.id
    const plan = this.getPlanFromPriceId(priceId)
    const status = sub.status.toUpperCase() as SubscriptionStatus

    return await this.prisma.subscription.update({
      where: { stripeSubId: sub.id },
      data: { userId, priceId, plan, status }
    })
  }

  async handleStripeEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log(`\n[${event.type}] 🎉 Checkout session completed\n${event.data.object.id}`)
        return this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)

      case 'customer.subscription.updated':
        console.log(`\n[${event.type}] 🔄 Subscription updated\n${event.data.object.id}`)
        return this.handleSubscriptionUpdatedOrDeleted(event.data.object as Stripe.Subscription)

      case 'customer.subscription.deleted':
        console.log(`\n[${event.type}] ❌ Subscription cancelled\n${event.data.object.id}`)
        return this.handleSubscriptionUpdatedOrDeleted(event.data.object as Stripe.Subscription)

      default:
        console.log(`[${event.type}] 🤷‍♀️ Unhandled event type`)
    }
  }
}
