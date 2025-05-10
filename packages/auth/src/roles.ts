import { z } from 'zod'

export const roles = ['ADMIN', 'MEMBER'] as const

export const roleSchema = z.enum(roles, {
  message: `Role must be one of: ${roles.join(', ')}`
})

export type Role = z.infer<typeof roleSchema>
