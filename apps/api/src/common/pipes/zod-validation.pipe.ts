import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { IncomingHttpHeaders } from 'http'
import { ZodSchema } from 'zod'

import { validate } from '@/common/zod/create-zod-dto'

export class ZodValidationPipe implements PipeTransform {
  // Optionally, a schema can be passed in the constructor.
  constructor(private schema?: ZodSchema) {}

  transform({ __headers, ...value }: any, metadata: ArgumentMetadata) {
    let schemaToUse: ZodSchema | undefined = this.schema
    const headers: IncomingHttpHeaders = __headers || {}

    // If no schema was provided in the constructor, check if the metatype has a static schema.
    if (!schemaToUse && metadata.metatype && (metadata.metatype as any).schema) {
      schemaToUse = (metadata.metatype as any).schema
    }

    // If still no schema, bypass transformation.
    if (!schemaToUse) {
      return value
    }

    return validate(schemaToUse, value, headers['x-language'])
  }
}
