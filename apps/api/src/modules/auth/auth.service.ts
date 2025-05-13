import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@semicek-innovations/shared-schemas'

import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  validateUser(login: string, password: string) {
    return this.usersService.validateUser(login, password)
  }

  login(user: User) {
    const payload: JwtPayload = { id: user.id, username: user.username }
    return { token: this.jwtService.sign(payload) }
  }
}
