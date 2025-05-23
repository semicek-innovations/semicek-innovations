import { Module } from '@nestjs/common'

import { StripeService } from './stripe.service'
import { StripeWebhookController } from './stripe-webhook.controller'

@Module({
  providers: [StripeService],
  controllers: [StripeWebhookController],
  exports: [StripeService]
})
export class StripeModule {}
