import { AppAbility, getUserPermissions } from '@semicek-innovations/auth'
import { SetMetadata, UnauthorizedException } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export interface RequiredRule {
  action: Parameters<AppAbility['can']>[0]
  subject: Parameters<AppAbility['can']>[1]
  message?: string
}

export const CASL = 'casl'
export const Casl = (...requirements: RequiredRule[]) => SetMetadata(CASL, requirements)

export function casl(request: FastifyRequest, ...rules: RequiredRule[]) {
  const user = request.user

  if (!request.user) {
    return false
  }

  const ability = getUserPermissions(user.id, user.role)

  if (rules.every(rule => ability.can(rule.action, rule.subject as any))) {
    return true
  }

  const message =
    rules.find(rule => rule.message)?.message ??
    `You are not authorized to ${rules.map(rule => `${rule.action} ${rule.subject.toString().toLowerCase()}`).join(', ')}`

  throw new UnauthorizedException(message)
}
