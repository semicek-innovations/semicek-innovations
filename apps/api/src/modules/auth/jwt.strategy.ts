import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { env } from '@semicek-innovations/env'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../users/users.service'

export interface JwtPayload {
  id: string
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.SECRET_KEY
    })
  }

  validate(payload: JwtPayload) {
    return this.usersService.findOne(payload.id)
  }
}
