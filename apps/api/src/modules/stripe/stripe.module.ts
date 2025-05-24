import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { StripeController } from './stripe.controller'
import { StripeService } from './stripe.service'
import { StripeWebhookController } from './stripe-webhook.controller'

@Module({
  imports: [PrismaModule],
  providers: [StripeService],
  controllers: [StripeController, StripeWebhookController],
  exports: [StripeService]
})
export class StripeModule {}
