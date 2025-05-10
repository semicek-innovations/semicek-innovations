'use server'

import { cookies } from '@/lib/cookies'

export async function signOutAction() {
  const [serverCookies] = await cookies.server()
  serverCookies.delete('token')
}
