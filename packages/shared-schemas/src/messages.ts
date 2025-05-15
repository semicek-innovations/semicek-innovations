import { authValidationMessages } from './auth'
import { userValidationMessages } from './users'

export const validationsMessages = {
  ...authValidationMessages,
  ...userValidationMessages
}
