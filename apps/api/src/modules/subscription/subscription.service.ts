import { Injectable } from '@nestjs/common'
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client'
import Stripe from 'stripe'

import { PrismaService } from '../prisma/prisma.service'
import { StripeService } from '../stripe/stripe.service'

export interface UpsertSubscriptionParams {
  userId: string
  stripeSubId?: string
  priceId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  endDate?: Date
}

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService
  ) {}

  async getAvailablePlans() {
    const prices = await this.stripe.client.prices.list({ active: true, expand: ['data.product'] })
    return prices.data
      .filter(p => p.id in Object.values(this.stripe.prices))
      .map(p => ({
        priceId: p.id,
        price: p.unit_amount,
        plan: this.stripe.getPlanFromPriceId(p.id),
        productName: (p.product as Stripe.Product)?.name,
        productDescription: (p.product as Stripe.Product)?.description,
        currency: p.currency,
        interval: p.recurring?.interval,
        intervalCount: p.recurring?.interval_count
      }))
  }

  async getUserSubscriptions(userId: string) {
    return this.prisma.subscription.findMany({ where: { userId } })
  }

  async getUserSubscription(userId: string) {
    return this.prisma.subscription.findFirst({ where: { userId } })
  }

  async upsertSubscription(
    id: string,
    { userId, stripeSubId = id, priceId, plan, status, endDate }: UpsertSubscriptionParams
  ) {
    return this.prisma.subscription.upsert({
      where: { stripeSubId: id },
      update: { userId, stripeSubId, priceId, plan, status, endDate },
      create: { userId, stripeSubId, priceId, plan, status, endDate }
    })
  }
}
