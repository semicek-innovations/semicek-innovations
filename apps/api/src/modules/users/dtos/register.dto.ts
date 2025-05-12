import { registerSchema } from '@semicek-innovations/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/common/zod/create-zod-dto'

export class RegisterDto extends createZodDto(registerSchema) {}
export interface RegisterDto extends z.infer<typeof registerSchema> {}
