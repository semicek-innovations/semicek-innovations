import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { env } from '@semicek-innovations/env'
import { FastifyRequest } from 'fastify'

import { StripeService } from './stripe.service'

@Controller('stripe')
@ApiBearerAuth('token')
export class StripeController {
  constructor(private readonly stripe: StripeService) {}

  @Get('portal')
  async createCustomerPortalSession(@Req() req: FastifyRequest) {
    const session = await this.stripe.createCustomerPortalSession(req.user.id, env.FRONTEND_URL)
    return { url: session.url }
  }
}
