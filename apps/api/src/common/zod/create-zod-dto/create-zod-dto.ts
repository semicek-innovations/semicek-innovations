/* eslint-disable no-new-func */
import { ApiProperty } from '@nestjs/swagger'
import { ZodObject, ZodRawShape } from 'zod'

import { getMetadataForSchema } from './helpers'

/**
 * Recursively generates a DTO class from a Zod object schema.
 * Accepts an optional dtoName to use for the class name.
 */
export function createZodDto<T extends ZodObject<ZodRawShape>>(schema: T, dtoName?: string) {
  class ZodDto {
    static schema = schema
  }
  // Determine the class name: either the passed name, the schema's name, or a default.
  const name = dtoName || schema._def?.name || 'ZodDto'

  // Create a dynamic class with the desired name using the Function constructor.
  const DynamicDtoClass: typeof ZodDto = new Function(
    'ApiProperty',
    `
      return class ${name} {}
    `
  )(ApiProperty)
  DynamicDtoClass.schema = schema

  // Get the shape of the schema.
  const shape = schema.shape

  for (const key in shape) {
    if (Object.prototype.hasOwnProperty.call(shape, key)) {
      // Create a dummy property on the class's prototype.
      Object.defineProperty(DynamicDtoClass.prototype, key, {
        enumerable: true,
        configurable: true,
        writable: true
      })

      // Get metadata for this field.
      const metadata = getMetadataForSchema(shape[key], createZodDto)

      // Apply the @ApiProperty decorator with the inferred metadata.
      ApiProperty({
        type: metadata.type,
        ...(metadata.isArray ? { isArray: true } : {}),
        ...(metadata.isOptional ? { required: false } : {}),
        ...(metadata.isNullable ? { nullable: true } : {})
      })(DynamicDtoClass.prototype, key)
    }
  }

  return DynamicDtoClass
}
