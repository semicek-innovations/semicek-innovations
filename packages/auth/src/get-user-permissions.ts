import { defineAbilityFor } from './ability'
import { Role } from './roles'
import { SubscriptionPlan } from './subscription-plans'

export function getUserPermissions(
  userId: string,
  role: Role | 'ANONYMOUS' = 'ANONYMOUS',
  subscriptionPlan: SubscriptionPlan = 'FREE'
) {
  const ability = defineAbilityFor({ __typename: 'User', id: userId, role, subscriptionPlan })
  return ability
}
