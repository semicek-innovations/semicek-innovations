import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'

import { casl } from '@/common/decorators/casl.decorator'
import { Public } from '@/common/decorators/is-public.decorator'

import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'
import { UsersService } from './users.service'

@Controller('users')
@ApiBearerAuth('token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Post('register')
  @Public()
  register(@Req() req: FastifyRequest, @Body() body: RegisterDto) {
    if (!req.user || req.user.role !== 'ADMIN') delete body.role
    return this.usersService.register(body)
  }

  @Patch(':id')
  updateUser(@Req() req: FastifyRequest, @Param('id') id: string, @Body() body: UpdateDto) {
    casl(req, {
      action: 'update',
      subject: { __typename: 'User', id, role: 'USER', subscriptionPlan: 'FREE' },
      message: 'You are not authorized to update this user'
    })
    if (!req.user || req.user.role !== 'ADMIN') delete body.role
    return this.usersService.update(id, body)
  }

  @Delete(':id')
  deleteUser(@Req() req: FastifyRequest, @Param('id') id: string) {
    casl(req, {
      action: 'delete',
      subject: { __typename: 'User', id, role: 'USER', subscriptionPlan: 'FREE' },
      message: 'You are not authorized to delete this user'
    })
    return this.usersService.remove(id)
  }
}
