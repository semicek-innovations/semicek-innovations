import { updateSchema } from '@semicek-innovations/shared-schemas'
import { z } from 'zod'

import { createZodDto } from '@/lib/zod/create-zod-dto'

export class UpdateDto extends createZodDto(updateSchema) {}
export interface UpdateDto extends z.infer<typeof updateSchema> {}
