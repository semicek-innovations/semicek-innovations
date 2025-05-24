import { Injectable } from '@nestjs/common'
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'

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
  constructor(private readonly prisma: PrismaService) {}

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
