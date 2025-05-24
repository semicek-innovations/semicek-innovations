import { CreateCheckoutSessionSchema } from '@semicek-innovations/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/common/zod/create-zod-dto'

export class CreateCheckoutSessionDto extends createZodDto(CreateCheckoutSessionSchema) {}
export interface CreateCheckoutSessionDto extends z.infer<typeof CreateCheckoutSessionSchema> {}
