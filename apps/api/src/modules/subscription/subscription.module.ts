import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { StripeModule } from '../stripe/stripe.module'
import { SubscriptionController } from './subscription.controller'
import { SubscriptionService } from './subscription.service'

@Module({
  imports: [PrismaModule, StripeModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
