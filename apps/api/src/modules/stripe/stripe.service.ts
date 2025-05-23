import { Injectable } from '@nestjs/common'
import { env } from '@semicek-innovations/env'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private readonly stripe: Stripe

  constructor() {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' })
  }

  getStripe() {
    return this.stripe
  }

  async createCustomer(email: string, metadata: Record<string, string>) {
    return this.stripe.customers.create({ email, metadata })
  }

  async getCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId)
  }
}
