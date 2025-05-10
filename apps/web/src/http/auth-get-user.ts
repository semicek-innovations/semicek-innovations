import { User } from '@semicek-innovations/shared-schemas'

import { api } from './api-client'

export async function getUser() {
  const result = await api.get('auth/user').json<User>()
  return result
}
