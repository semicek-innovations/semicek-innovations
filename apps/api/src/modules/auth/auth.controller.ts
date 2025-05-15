import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { multiLangText } from '@semicek-innovations/i18n'
import { FastifyRequest } from 'fastify'

import { Public } from '@/common/decorators/is-public.decorator'

import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { RequestPasswordResetDto, ResetPasswordWithConfirmDto } from './dtos/reset-password.dto'
import { LocalAuthGuard } from './local-auth.guard'
import { authMessages } from './messages'

@Controller('auth')
@ApiBearerAuth('token')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user')
  getUser(@Req() req: FastifyRequest) {
    return req.user
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: 'Login credentials', type: LoginDto })
  login(@Req() req: FastifyRequest) {
    return this.authService.login(req.user)
  }

  @Post('request-password-reset')
  @Public()
  async requestPasswordReset(@Req() req: FastifyRequest, @Body() dto: RequestPasswordResetDto) {
    const lang = req.headers['x-language']
    await this.authService.requestReset(dto, lang)
    return { message: multiLangText(authMessages.resetLinkSent, { lang }) }
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Req() req: FastifyRequest, @Body() dto: ResetPasswordWithConfirmDto) {
    const lang = req.headers['x-language']
    await this.authService.resetPassword(dto, lang)
    return { message: multiLangText(authMessages.passwordResetSuccess, { lang }) }
  }
}
