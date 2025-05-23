import 'dotenv/config'

import { z } from 'zod'

const server = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGINS: z.string().default('*'),
  SECRET_KEY: z.string().default('SECRET_KEY'),
  DATABASE_URL: z.string().default(''),
  DIRECT_URL: z.string().default(''),
  GMAIL_USER: z.string().default(''),
  GMAIL_PASS: z.string().default(''),
  GMAIL_SUPPORT: z.string().default(''),
  GMAIL_NO_REPLY: z.string().default(''),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  STRIPE_SECRET_KEY: z.string().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().default(''),
  STRIPE_PRO_PRICE_ID: z.string().default(''),
  STRIPE_PREMIUM_PRICE_ID: z.string().default('')
})

const client = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3333'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().default('')
})

const processEnv = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CORS_ORIGINS: process.env.CORS_ORIGINS,
  SECRET_KEY: process.env.SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_SUPPORT: process.env.GMAIL_SUPPORT,
  GMAIL_NO_REPLY: process.env.GMAIL_NO_REPLY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
  STRIPE_PREMIUM_PRICE_ID: process.env.STRIPE_PREMIUM_PRICE_ID,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
}

type ServerEnvs = z.infer<typeof server>
type ClientEnvs = z.infer<typeof client>

const merged = server.merge(client)
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
// eslint-disable-next-line no-unused-vars
let env: ServerEnvs & ClientEnvs = process.env

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === 'undefined'

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv) // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        )
      /*  @ts-expect-error - can't type this properly in jsdoc */
      return target[prop]
    }
  })
}

export { env }
