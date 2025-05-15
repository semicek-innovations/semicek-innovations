import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { env } from '@semicek-innovations/env'
import { Language, multiLangText } from '@semicek-innovations/i18n'
import { User } from '@semicek-innovations/shared-schemas'
import { randomBytes } from 'crypto'
import * as path from 'path'

import { prismaError } from '@/common/error/prisma-error'

import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { RequestPasswordResetDto, ResetPasswordDto } from './dtos/reset-password.dto'
import { JwtPayload } from './jwt.strategy'
import { authMessages, resetPasswordEmailMessages } from './messages'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly mailerService: MailerService,
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

  async requestReset(dto: RequestPasswordResetDto, lang?: Language) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { email: dto.email } })
      if (!user) return // Prevent user existence leaks

      // Delete any existing tokens for this user
      await this.prismaService.passwordResetToken.deleteMany({ where: { userId: user.id } })

      const token = randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

      await this.prismaService.passwordResetToken.create({ data: { userId: user.id, token, expiresAt } })

      const resetLink = `${env.FRONTEND_URL}/reset-password?token=${token}`

      await this.mailerService.sendMail({
        to: user.email,
        subject: multiLangText(resetPasswordEmailMessages.subject, { lang }),
        template: 'reset-password',
        context: {
          resetLink,
          title: multiLangText(resetPasswordEmailMessages.title, { lang }),
          greeting: multiLangText(resetPasswordEmailMessages.greeting, { lang }).replace('{{name}}', user.name),
          instructions: multiLangText(resetPasswordEmailMessages.instructions, { lang }),
          button: multiLangText(resetPasswordEmailMessages.button, { lang }),
          ignore: multiLangText(resetPasswordEmailMessages.ignore, { lang }),
          closing: multiLangText(resetPasswordEmailMessages.closing, { lang }),
          copyright: multiLangText(resetPasswordEmailMessages.copyright, { lang }).replace(
            '{{year}}',
            new Date().getFullYear().toString()
          ),
          support: multiLangText(resetPasswordEmailMessages.support, { lang })
        },
        attachments: [
          {
            filename: 'semicek-innovations-horizontal-white.png',
            path: path.join(process.cwd(), 'src', 'assets', 'semicek-innovations-horizontal-white.png'),
            cid: 'semicek-logo'
          }
        ]
      })
    } catch (error) {
      prismaError(error, {}, lang)
    }
  }

  async resetPassword(dto: ResetPasswordDto, lang?: Language) {
    try {
      const record = await this.prismaService.passwordResetToken.findUnique({
        where: { token: dto.token },
        include: { user: true }
      })

      if (!record || new Date().getTime() > record.expiresAt.getTime()) {
        throw new BadRequestException(multiLangText(authMessages.invalidOrExpiredToken, { lang }))
      }

      await this.usersService.update(record.userId, { password: dto.newPassword })

      // Delete any existing tokens for this user
      await this.prismaService.passwordResetToken.deleteMany({ where: { userId: record.userId } })
    } catch (error) {
      prismaError(error, {}, lang)
    }
  }
}
