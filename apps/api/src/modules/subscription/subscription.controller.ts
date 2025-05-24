import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'

import { StripeService } from '../stripe/stripe.service'
import { CreateCheckoutSessionDto } from './dtos/create-checkout-session.dto'

@Controller('subscription')
@ApiBearerAuth('token')
export class SubscriptionController {
  constructor(private readonly stripe: StripeService) {}

  @Post('checkout')
  async createCheckoutSession(@Req() req: FastifyRequest, @Body() body: CreateCheckoutSessionDto) {
    const session = await this.stripe.createSubscriptionCheckoutSession({
      userId: req.user.id,
      priceId: body.priceId,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl
    })

    return { url: session.url }
  }
}
