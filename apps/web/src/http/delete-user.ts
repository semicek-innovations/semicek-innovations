import { api } from './api-client'

export async function deleteUser(userId: number) {
  const result = await api.delete(`users/${userId}`).json<{ message: string }>()
  return result
}
