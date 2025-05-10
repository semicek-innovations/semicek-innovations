import 'zod'

import { Language } from '@semicek-innovations/i18n'
import { User } from '@semicek-innovations/shared-schemas'

declare module 'zod' {
  // Extend the Zod type definition so that every schema _def can have a name.
  interface ZodTypeDef {
    name?: string
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    'x-language'?: Language
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}
