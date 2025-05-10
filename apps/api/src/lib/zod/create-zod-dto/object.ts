import { z } from 'zod'

export function zObject<T extends z.ZodRawShape>(name: string, ...params: Parameters<typeof z.object<T>>) {
  const schema = z.object<T>(...params)
  schema._def.name = name
  return schema
}
