import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { multiLangText } from '@semicek-innovations/i18n'
import { INVALID_CREDENTIALS, User, validationsMessages } from '@semicek-innovations/shared-schemas'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true })
  }

  async validate(req: FastifyRequest, username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password)
    const lang = req.headers['x-language']
    const message = multiLangText(validationsMessages[INVALID_CREDENTIALS], { lang })

    if (!user) {
      throw new UnauthorizedException({
        message,
        errors: { username: [message], password: [message] }
      })
    }
    return user
  }
}
