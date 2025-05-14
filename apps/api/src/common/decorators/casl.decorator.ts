import { SetMetadata, UnauthorizedException } from '@nestjs/common'
import { AppAbility, getUserPermissions } from '@semicek-innovations/auth'
import { LanguageText, multiLangText } from '@semicek-innovations/i18n'
import { FastifyRequest } from 'fastify'

export interface RequiredRule {
  action: Parameters<AppAbility['can']>[0]
  subject: Parameters<AppAbility['can']>[1]
  message: LanguageText
}

export const CASL = 'casl'
export const Casl = (...requirements: RequiredRule[]) => SetMetadata(CASL, requirements)

export function casl(request: FastifyRequest, ...rules: RequiredRule[]) {
  const user = request.user

  if (!request.user) {
    return false
  }

  const ability = getUserPermissions(user.id, user.role)

  for (const rule of rules) {
    if (!ability.can(rule.action, rule.subject as any)) {
      throw new UnauthorizedException(multiLangText(rule.message, { lang: request.headers['x-language'] }))
    }
  }

  return true
}
