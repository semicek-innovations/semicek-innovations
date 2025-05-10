import { env } from '@semicek-innovations/env'

export const PORT = env.PORT
export const ENV = env.NODE_ENV
export const CORS_ORIGINS = splitString(env.CORS_ORIGINS, ';')

function splitString(str: string, separator: string) {
  const result = str.split(separator)
  return result.length === 1 ? result[0] : result
}
