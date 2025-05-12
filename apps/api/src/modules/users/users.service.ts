import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

import { deleteUser, getNextUserId, getUser, getUsers, saveUser } from '@/db/users'

import { RegisterDto } from './dtos/register.dto'
import { UpdateDto } from './dtos/update.dto'

@Injectable()
export class UsersService {
  async validateUser(username: string, password: string) {
    const user = await getUser('username', username, false)
    if (!user) return undefined

    const match = await bcrypt.compare(password, user.password)
    if (!match) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findAll() {
    const users = await getUsers()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user)
  }

  async findOne(id: string) {
    const user = await getUser('id', id)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async register(body: RegisterDto) {
    const existingUser = await getUser('username', body.username, false)
    if (existingUser) {
      throw new ConflictException({ errors: { username: ['Username already exists'] } })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = await saveUser({
      id: await getNextUserId(),
      username: body.username,
      role: body.role,
      subscriptionPlan: 'FREE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: '',
      isActive: true,
      name: '',
      password: hashedPassword
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }

  async update(id: string, body: UpdateDto) {
    const user = await getUser('id', id)

    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassword
    }

    if (body.username) {
      const existingUser = await getUser('username', body.username, false)
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException({ errors: { username: ['Username already exists'] } })
      }
    }

    Object.assign(user, body)
    await saveUser(user)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async remove(id: string) {
    await deleteUser(id)
    return { message: 'User deleted' }
  }
}
