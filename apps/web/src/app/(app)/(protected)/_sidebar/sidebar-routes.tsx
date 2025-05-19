'use client'

import { UsersIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

import { useLanguage } from '@/app/_providers/language-provider'
import { SidebarRoute, SidebarRouteProps } from '@/components/sidebar'

import { protectedSidebarTexts } from './consts'

export function ProtectedSidebarRoutes() {
  const { multiLangText } = useLanguage()
  const routes = useMemo(
    () =>
      [
        {
          icon: UsersIcon,
          href: '#',
          children: multiLangText(protectedSidebarTexts.routes.users),
          // can: { I: 'get', a: 'User' },
          classNames: { icon: 'stroke-2' }
        }
      ] as SidebarRouteProps[],
    [multiLangText]
  )

  return (
    <div className="space-y-1 overflow-hidden transition-width">
      {routes.map(({ children, classNames, ...rest }, i) => (
        <SidebarRoute
          classNames={{
            ...classNames,
            base: [
              'data-[active=false]:data-[hover=true]:bg-white/20 data-[active=true]:bg-white/20',
              classNames?.base
            ],
            subRoute: [
              'data-[active=false]:data-[hover=true]:bg-white/20 data-[active=true]:bg-white/20',
              classNames?.subRoute
            ]
          }}
          {...rest}
          key={i}
        >
          {children}
        </SidebarRoute>
      ))}
    </div>
  )
}
