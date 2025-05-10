import { UserWithPassword } from '@semicek-innovations/shared-schemas'
import { NotFoundException } from '@nestjs/common'
import { promises as fs } from 'fs'
import * as path from 'path'

const USERS_PATH = path.resolve(__dirname, 'users.json').replace('dist', 'src')

export async function saveUser(user: UserWithPassword) {
  const users = await getUsers()
  const existingUserIndex = users.findIndex(u => u.id === user.id)

  if (existingUserIndex !== -1) {
    users[existingUserIndex] = user
  } else {
    users.push(user)
  }

  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2))

  return user
}

export async function getUsers() {
  const data = await fs.readFile(USERS_PATH, 'utf8')
  return JSON.parse(data) as UserWithPassword[]
}

export async function getUser<T extends keyof UserWithPassword, E extends boolean = true>(
  key: T,
  value: UserWithPassword[T],
  raiseError: E = true as E
): Promise<E extends true ? UserWithPassword : UserWithPassword | undefined> {
  const users = await getUsers()
  const user = users.find(u => u[key] === value)
  if (!user && raiseError) throw new NotFoundException('User not found')
  return user as any
}

export async function getNextUserId() {
  const users = await getUsers()
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
}

export async function deleteUser(id: number) {
  const users = await getUsers()
  const userIndex = users.findIndex(u => u.id === id)
  if (userIndex === -1) throw new NotFoundException('User not found')
  users.splice(userIndex, 1)
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2))
}
