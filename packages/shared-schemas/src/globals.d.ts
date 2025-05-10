import 'zod'

declare module 'zod' {
  // Extend the Zod type definition so that every schema _def can have a name.
  interface ZodTypeDef {
    name?: string
  }
}
