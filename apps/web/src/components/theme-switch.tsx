'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const ThemeIcon = resolvedTheme === 'light' ? MoonIcon : SunIcon

  function toggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return <ThemeIcon width={24} className="cursor-pointer" onClick={toggleTheme} />
}
