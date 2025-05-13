import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

import { CASL, casl, RequiredRule } from '@/common/decorators/casl.decorator'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.getAllAndOverride<RequiredRule[]>(CASL, [context.getHandler(), context.getClass()]) ?? []

    if (rules.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()

    return casl(request, ...rules)
  }
}
