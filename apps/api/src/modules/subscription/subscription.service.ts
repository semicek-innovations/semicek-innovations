import { Injectable } from '@nestjs/common'
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertSubscription({
    userId,
    stripeSubId,
    priceId,
    plan,
    status,
    endDate
  }: {
    userId: string
    stripeSubId: string
    priceId: string
    plan: SubscriptionPlan
    status: SubscriptionStatus
    endDate: Date
  }) {
    return this.prisma.subscription.upsert({
      where: { stripeSubId },
      update: { userId, priceId, plan, status, endDate },
      create: { userId, stripeSubId, priceId, plan, status, endDate }
    })
  }

  async getUserSubscriptions(userId: string) {
    return this.prisma.subscription.findMany({ where: { userId } })
  }
}
