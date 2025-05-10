import { LiteralUnion, tryParseJSON } from '@semicek-innovations/shared-utils'
import { CookieAttr } from 'cookies'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { getServerCookies } from './server'

export type Cookie = LiteralUnion<'token' | 'preferred-language', string>
export type CookieOptions = CookieAttr
export type RequestCookie<T> = {
  name: Cookie
  value: T
}

export const defaultCookieOptions: CookieOptions = {
  path: '/',
  secure: true,
  sameSite: 'strict'
}

export function cookies<T = any>(): RequestCookie<T>[] {
  const cookies = parseCookies()
  return Object.entries(cookies || {}).map(([name, value]) => ({ name, value: tryParseJSON(value) }))
}

function set(name: Cookie, value: any, options: CookieOptions = {}) {
  if (!options.expires) {
    defaultCookieOptions.maxAge = 60 * 60 * 24 * 30 // Default to 30 days
  }

  return setCookie(undefined, name, typeof value === 'string' ? value : JSON.stringify(value), {
    ...defaultCookieOptions,
    ...options
  })
}

function get<T = any>(name: Cookie): T | undefined {
  const value = cookies().find(cookie => cookie.name === name)?.value
  return tryParseJSON(value)
}

function destroy(name: Cookie) {
  return destroyCookie(undefined, name)
}

cookies.set = set
cookies.get = get
cookies.delete = destroy
cookies.server = serverCookies

async function serverCookies() {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return [getServerCookies(cookieStore), true] as const
  }
  return [cookies, false] as const
}
