import { defineAbilityFor } from './ability'
import { Role } from './roles'

export function getUserPermissions(userId: number, role: Role | 'ANONYMOUS') {
  const ability = defineAbilityFor({ __typename: 'User', id: userId, role })
  return ability
}
