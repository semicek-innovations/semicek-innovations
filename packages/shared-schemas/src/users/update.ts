import { z } from 'zod'

import { registerSchema } from './register'

export const updateSchema = registerSchema.partial()
updateSchema._def.name = 'UpdateSchema'

export type UpdatePayload = z.infer<typeof updateSchema>
