import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'

import { Public } from '@/common/decorators/is-public.decorator'

import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
@ApiBearerAuth('token')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user')
  async getUser(@Req() req: FastifyRequest) {
    return req.user
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: 'Login credentials', type: LoginDto })
  async login(@Req() req: FastifyRequest) {
    return this.authService.login(req.user)
  }
}
