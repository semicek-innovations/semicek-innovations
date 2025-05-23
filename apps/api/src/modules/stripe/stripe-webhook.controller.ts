import { BadRequestException, Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { env } from '@semicek-innovations/env'
import Stripe from 'stripe'

import { Public } from '@/common/decorators/is-public.decorator'

import { StripeService } from './stripe.service'

@Public()
@ApiTags('Stripe Webhook')
@Controller('stripe/webhook')
export class StripeWebhookController {
  private stripe: Stripe
  private secret: string
  private processedEvents = new Set<string>()

  constructor(private stripeService: StripeService) {
    this.secret = env.STRIPE_WEBHOOK_SECRET
    this.stripe = this.stripeService.getStripe()
  }

  @Post()
  async handleStripeWebhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') signature: string) {
    let event: Stripe.Event

    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody!, signature, this.secret)
    } catch (err: any) {
      console.error('Webhook signature verification failed.', err.message)
      throw new BadRequestException('Webhook Error: Invalid signature')
    }

    // Check if we've already processed this event
    if (this.processedEvents.has(event.id)) {
      console.log(`\n[${event.type}] ⚠️ Duplicate event detected, skipping processing\n${event.id}`)
      return { received: true }
    }

    // Add event to processed set
    this.processedEvents.add(event.id)

    // Remove old events from the set (optional, to prevent memory leaks)
    if (this.processedEvents.size > 1000) {
      const iterator = this.processedEvents.values()
      for (let i = 0; i < 100; i++) {
        this.processedEvents.delete(iterator.next().value!)
      }
    }

    switch (event.type) {
      case 'checkout.session.completed':
        console.log(`\n[${event.type}] 🎉 Checkout session completed\n${event.data.object.id}`)
        break
      default:
        console.log(`\n[${event.type}] 🤷‍♀️ Unhandled event type`)
    }

    return { received: true }
  }
}
