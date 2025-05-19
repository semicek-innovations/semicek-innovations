'use client'

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle
} from '@heroui/react'
import Link from 'next/link'
import { useState } from 'react'

import { useLanguage } from '@/app/_providers/language-provider'
import { useIsMounted } from '@/hooks/use-is-mounted'

import { AuthButton } from '../button'
import { FaviconFilled, SemicekInnovations } from '../icon'
import { LanguagePopover } from '../language'
import { ThemeSwitch } from '../theme-switch'
import { texts } from './consts'
import { NavLink } from './nav-link'

export function Navbar() {
  const { multiLangText } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMounted = useIsMounted()

  const menuItems = [{ label: multiLangText(texts.routes.home), href: '/' }]

  if (!isMounted) return null
  return (
    <HeroUINavbar className="bg-background/60 text-foreground" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={multiLangText(isMenuOpen ? texts.closeMenu : texts.openMenu)}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <FaviconFilled classNames={{ base: 'shrink-0 h-12', S: 'dark:text-white' }} />
            <SemicekInnovations classNames={{ base: 'h-6', text: 'dark:text-white' }} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavLink href={item.href} key={`${item.label}-${index}`}>
            {item.label}
          </NavLink>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-1.5 max-sm:hidden">
          <ThemeSwitch />
          <LanguagePopover className="ml-1" />
        </NavbarItem>
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/60">
        <div className="absolute right-6 top-3 flex items-center justify-end gap-1.5">
          <ThemeSwitch />
          <LanguagePopover className="ml-1" />
        </div>
        {menuItems.map((item, index) => (
          <NavLink href={item.href} key={`${item.label}-${index}`} isMenu>
            {item.label}
          </NavLink>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  )
}
