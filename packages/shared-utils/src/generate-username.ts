import { randomBytes } from 'crypto'
import snakeCase from 'lodash.snakecase'

const MAX_USERNAME_LENGTH = 30
const RANDOM_ID_BYTES = 3 // results in 6-character hex string

export function generateUsername(fullName: string, appendId = true) {
  const uniqueId = `_${randomBytes(RANDOM_ID_BYTES).toString('hex')}`
  const nameParts = snakeCase(fullName).split('_')

  const maxNameLength = MAX_USERNAME_LENGTH - uniqueId.length

  let username = ''
  for (const part of nameParts) {
    const next = username ? `_${part}` : part
    if ((username + next).length > maxNameLength) break
    username += next
  }

  // Ensure the username is not empty
  if (!username && nameParts.length > 0) {
    username = nameParts[0].slice(0, maxNameLength)
  }

  if (!appendId) return username

  return `${username}${uniqueId}`
}
