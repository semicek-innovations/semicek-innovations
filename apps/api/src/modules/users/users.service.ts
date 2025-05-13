import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { generateUsername } from '@semicek-innovations/shared-utils'
import * as bcrypt from 'bcryptjs'

import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'

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

  async findAll() {
    return await this.prismaService.user.findMany({ omit: { password: true } })
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({ where: { id }, omit: { password: true } })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found')
        }
      }

      throw new BadRequestException('An error occurred while finding the user', {
        cause: error,
        description: error.message
      })
    }
  }

  async register(body: RegisterDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    if (!body.username) {
      body.username = generateUsername(body.name)
    }

    try {
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
      throw new BadRequestException('An error occurred while creating the user', {
        cause: error,
        description: error.message
      })
    }
  }

  async update(id: string, body: UpdateDto) {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10)
    }

    try {
      return await this.prismaService.user.update({ where: { id }, data: body, omit: { password: true } })
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found')
        }
      }

      throw new BadRequestException('An error occurred while deleting the user', {
        cause: error,
        description: error.message
      })
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } })
      return { message: 'User deleted' }
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found')
        }
      }

      throw new BadRequestException('An error occurred while deleting the user', {
        cause: error,
        description: error.message
      })
    }
  }
}
