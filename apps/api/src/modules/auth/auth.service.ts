import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { env } from '@semicek-innovations/env'
import { User } from '@semicek-innovations/shared-schemas'
import * as bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import * as path from 'path'

import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { RequestPasswordResetDto, ResetPasswordDto } from './dtos/reset-password.dto'
import { JwtPayload } from './jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  validateUser(login: string, password: string) {
    return this.usersService.validateUser(login, password)
  }

  login(user: User) {
    const payload: JwtPayload = { id: user.id, username: user.username }
    return { token: this.jwtService.sign(payload) }
  }

  async requestReset(dto: RequestPasswordResetDto) {
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
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        name: user.name,
        resetLink,
        year: new Date().getFullYear()
      },
      attachments: [
        {
          filename: 'semicek-innovations-horizontal-white.png',
          path: path.join(process.cwd(), 'src', 'assets', 'semicek-innovations-horizontal-white.png'),
          cid: 'semicek-logo'
        }
      ]
    })
  }

  async resetPassword(dto: ResetPasswordDto) {
    const record = await this.prismaService.passwordResetToken.findUnique({
      where: { token: dto.token },
      include: { user: true }
    })

    if (!record || new Date().getTime() > record.expiresAt.getTime()) {
      throw new BadRequestException('Invalid or expired token')
    }

    const hashed = await this.hash(dto.newPassword)

    await this.prismaService.user.update({
      where: { id: record.userId },
      data: { password: hashed }
    })

    // Delete any existing tokens for this user
    await this.prismaService.passwordResetToken.deleteMany({ where: { userId: record.userId } })
  }
}
