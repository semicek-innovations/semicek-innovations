import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from './ability'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: Omit<User, 'role'> & { role: User['role'] | 'ANONYMOUS' },
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role | 'ANONYMOUS', PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['update', 'delete'], 'User', { id: { $eq: user.id } })
  },
  ANONYMOUS() {}
}
