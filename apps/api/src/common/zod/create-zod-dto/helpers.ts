import {
  ZodArray,
  ZodBoolean,
  ZodDefault,
  ZodEffects,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodType,
  ZodUnion
} from 'zod'

export function unwrapZodEffects(schema: ZodType): ZodObject<ZodRawShape> {
  let current: ZodType = schema
  while (current instanceof ZodEffects) {
    current = current.innerType()
  }
  if (!(current instanceof ZodObject)) {
    throw new Error('createZodDto only supports ZodObject schemas (optionally wrapped in ZodEffects)')
  }
  return current
}

/**
 * Recursively unwrap a schema if it is wrapped in ZodEffects (e.g. from .refine() or .transform())
 */
export function unwrapZodSchema(schema: ZodType<any, any>): {
  schema: ZodType<any, any>
  isOptional: boolean
  isNullable: boolean
} {
  if (schema instanceof ZodEffects) {
    return unwrapZodSchema(schema._def.schema)
  }
  if (schema instanceof ZodOptional) {
    return { ...unwrapZodSchema(schema._def.innerType), isOptional: true }
  }
  if (schema instanceof ZodNullable) {
    return { ...unwrapZodSchema(schema._def.innerType), isNullable: true }
  }
  if (schema instanceof ZodDefault) {
    return { ...unwrapZodSchema(schema._def.innerType), isOptional: true }
  }
  if (schema instanceof ZodUnion) {
    return unwrapZodSchema(schema._def.options[0])
  }
  return { schema, isOptional: false, isNullable: false }
}

/**
 * Returns Swagger metadata for a given Zod schema.
 * If the schema represents an array or an object, it will recursively generate a DTO.
 */
export function getMetadataForSchema(
  schema: ZodType<any, any>,
  createNestedType?: (schema: ZodObject<any>, dtoName?: string) => any
): { type: any; isArray?: boolean; isOptional: boolean; isNullable: boolean } {
  const { schema: unwrapped, isOptional, isNullable } = unwrapZodSchema(schema)

  if (unwrapped instanceof ZodArray) {
    // Recurse on the array item type.
    const itemMeta = getMetadataForSchema(unwrapped._def.type, createNestedType)
    return { type: itemMeta.type, isArray: true, isOptional, isNullable }
  }
  if (unwrapped instanceof ZodObject) {
    // Extract the name from the nested schema (if available)
    const nestedName = unwrapped._def?.name
    // Recursively generate a nested type for the object.
    return {
      type: createNestedType?.(unwrapped, nestedName) ?? Object,
      isOptional,
      isNullable
    }
  }
  if (unwrapped instanceof ZodString) {
    return { type: String, isOptional, isNullable }
  }
  if (unwrapped instanceof ZodNumber) {
    return { type: Number, isOptional, isNullable }
  }
  if (unwrapped instanceof ZodBoolean) {
    return { type: Boolean, isOptional, isNullable }
  }
  // Fallback for other types.
  return { type: Object, isOptional, isNullable }
}
