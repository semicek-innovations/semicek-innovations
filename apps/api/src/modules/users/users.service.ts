import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { username } })
    if (!user) return undefined

    const match = await bcrypt.compare(password, user.password)
    if (!match) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({ omit: { password: true } })
    return users
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id }, omit: { password: true } })
    return user
  }

  async register(body: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { username: body.username }
    })
    if (existingUser) {
      throw new ConflictException({ errors: { username: ['Username already exists'] } })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    return await this.prismaService.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        role: body.role,
        subscriptionPlan: 'FREE',
        email: '',
        isActive: true,
        name: ''
      },
      omit: { password: true }
    })
  }

  async update(id: string, body: UpdateDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10)
    }

    if (body.username) {
      const existingUser = await this.prismaService.user.findUnique({
        where: { username: body.username }
      })

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException({
          errors: { username: ['Username already exists'] }
        })
      }
    }

    return await this.prismaService.user.update({
      where: { id },
      data: body,
      omit: { password: true }
    })
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')

    await this.prismaService.user.delete({ where: { id } })
    return { message: 'User deleted' }
  }
}
