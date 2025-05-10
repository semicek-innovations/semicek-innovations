import { loginSchema } from '@semicek-innovations/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/lib/zod/create-zod-dto'

export class LoginDto extends createZodDto(loginSchema) {}
export interface LoginDto extends z.infer<typeof loginSchema> {}
