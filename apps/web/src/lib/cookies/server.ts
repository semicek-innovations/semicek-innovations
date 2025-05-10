import { tryParseJSON } from '@semicek-innovations/shared-utils'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { Cookie, CookieOptions, defaultCookieOptions, RequestCookie } from '.'

export function getServerCookies(cookies: ReadonlyRequestCookies) {
  function serverCookies<T = any>(): RequestCookie<T>[] {
    return cookies.getAll().map(({ name, value }) => ({ name, value: tryParseJSON(value) }))
  }

  function set(name: Cookie, value: any, options: CookieOptions = {}) {
    if (!options.expires) {
      defaultCookieOptions.maxAge = 60 * 60 * 24 * 30 // Default to 30 days
    }

    return cookies.set(name, typeof value === 'string' ? value : JSON.stringify(value), {
      ...defaultCookieOptions,
      ...options
    })
  }

  function get<T = any>(name: Cookie): T | undefined {
    const value = cookies.get(name)?.value
    return tryParseJSON(value)
  }

  function destroy(name: Cookie) {
    return cookies.delete(name)
  }

  serverCookies.set = set
  serverCookies.get = get
  serverCookies.delete = destroy

  return serverCookies
}
