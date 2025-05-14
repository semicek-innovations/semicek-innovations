import { Injectable } from '@nestjs/common'
import { Language, multiLangText } from '@semicek-innovations/i18n'
import { generateUsername } from '@semicek-innovations/shared-utils'
import * as bcrypt from 'bcryptjs'

import { prismaError } from '@/common/error/prisma-error'

import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'
import { usersMessages } from './messages'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(login: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { OR: [{ email: login }, { username: login }] } })
    if (!user) return undefined

    const match = await bcrypt.compare(password, user.password)
    if (!match) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findAll(lang?: Language) {
    try {
      return await this.prismaService.user.findMany({ omit: { password: true } })
    } catch (error) {
      prismaError(error, {}, lang)
    }
  }

  async findOne(id: string, lang?: Language) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({ where: { id }, omit: { password: true } })
    } catch (error) {
      prismaError(
        error,
        {
          recordNotFound: usersMessages.userNotFound(id)
        },
        lang
      )
    }
  }

  async register(body: RegisterDto, lang?: Language) {
    try {
      const hashedPassword = await bcrypt.hash(body.password, 10)

      if (!body.username) {
        body.username = generateUsername(body.name)
      }

      return await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
          username: body.username,
          role: body.role
        },
        omit: { password: true }
      })
    } catch (error: any) {
      prismaError(error, {}, lang)
    }
  }

  async update(id: string, body: UpdateDto, lang?: Language) {
    try {
      if (body.password) {
        body.password = await bcrypt.hash(body.password, 10)
      }

      return await this.prismaService.user.update({ where: { id }, data: body, omit: { password: true } })
    } catch (error: any) {
      prismaError(
        error,
        {
          recordNotFound: usersMessages.userNotFound(id)
        },
        lang
      )
    }
  }

  async remove(id: string, lang?: Language) {
    try {
      const user = await this.prismaService.user.delete({ where: { id } })
      return { message: multiLangText(usersMessages.userDeleted(user.username), { lang }) }
    } catch (error: any) {
      prismaError(
        error,
        {
          recordNotFound: usersMessages.userNotFound(id)
        },
        lang
      )
    }
  }
}
