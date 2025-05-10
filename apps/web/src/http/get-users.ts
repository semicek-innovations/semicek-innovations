import { User } from '@semicek-innovations/shared-schemas'

import { api } from './api-client'

export async function getUsers() {
  const result = await api.get('users').json<User[]>()
  return result
}
