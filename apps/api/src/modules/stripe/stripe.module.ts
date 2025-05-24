import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { StripeService } from './stripe.service'
import { StripeWebhookController } from './stripe-webhook.controller'

@Module({
  providers: [PrismaModule, StripeService],
  controllers: [StripeWebhookController],
  exports: [StripeService]
})
export class StripeModule {}
