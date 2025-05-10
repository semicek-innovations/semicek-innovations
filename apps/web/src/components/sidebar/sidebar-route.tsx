'use client'

import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { SlotsToClasses, tv } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'

import { Button, ButtonProps } from '@/components/button'

import { Can, CanProps } from '../can'
import { Collapse } from '../collapse'
import { IconType } from '../icon'

export const sidebarRoute = tv({
  slots: {
    base: 'group flex min-w-0 shrink-0 cursor-pointer items-center justify-start gap-2 rounded-small p-2.5 text-inherit',
    icon: 'h-5 w-5 shrink-0 outline-none',
    text: 'grow whitespace-nowrap font-semibold group-data-[open=false]:hidden',
    subRoute: ''
  },
  variants: {
    isSubRoute: {
      true: { base: 'p-1.5 pl-[2.125rem]', icon: 'h-4 w-4' }
    }
  }
})

type BaseSidebarRouteProps = Omit<ButtonProps, 'ref'> & {
  icon?: IconType
  activeVariant?: ButtonProps['variant']
  classNames?: SlotsToClasses<keyof ReturnType<typeof sidebarRoute>>
  can?: CanProps
}

export interface SidebarSubRouteProps extends Omit<BaseSidebarRouteProps, 'classNames'> {
  classNames?: Omit<SlotsToClasses<keyof ReturnType<typeof sidebarRoute>>, 'subRoute'>
}

export type SidebarRouteProps = BaseSidebarRouteProps & {
  subRoutes?: SidebarSubRouteProps[]
  isSubRoute?: boolean
}

function getIsActive(pathname: string, href?: string, subRoutes?: BaseSidebarRouteProps[]) {
  return pathname === href || !!(subRoutes && subRoutes.some(route => pathname === route.href))
}

export const SidebarRoute = forwardRef<HTMLButtonElement, SidebarRouteProps>(function EventsSidebarRoute(
  {
    icon: Icon,
    isSubRoute = false,
    size = isSubRoute ? 'sm' : 'md',
    variant = 'light',
    activeVariant = 'flat',
    children,
    classNames,
    className,
    subRoutes,
    can,
    ...props
  },
  ref
) {
  const pathname = usePathname()
  const classes = sidebarRoute({ isSubRoute })
  const isActive = getIsActive(pathname, props.href, subRoutes)
  const [isOpen, setIsOpen] = useState(isActive)

  useEffect(() => {
    setIsOpen(isActive)
  }, [isActive, pathname])

  function toggleOpen(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation()
    e.preventDefault()
    setIsOpen(prev => !prev)
  }

  return (
    <Can {...can}>
      <Button
        ref={ref}
        as={Link}
        data-active={isActive}
        data-subroute-open={isOpen}
        size={size}
        variant={isActive ? activeVariant : variant}
        className={classes.base({
          class: [classNames?.base, className]
        })}
        {...props}
      >
        {subRoutes && (
          <ChevronRightIcon
            className="h-5 w-5 shrink-0 outline-none transition-transform group-data-[open=false]:hidden group-data-[subroute-open=true]:rotate-90"
            onClick={toggleOpen}
          />
        )}
        {Icon && <Icon className={classes.icon({ class: classNames?.icon })} />}
        <p className={classes.text({ class: classNames?.text })}>{children}</p>
      </Button>
      {subRoutes && (
        <Collapse isOpen={isOpen} className="space-y-1 px-1 group-data-[open=false]:hidden">
          {subRoutes.map(({ className, ...route }, i) => (
            <SidebarRoute
              className={classes.subRoute({ class: [className, classNames?.subRoute] })}
              isSubRoute
              {...route}
              key={i}
            />
          ))}
        </Collapse>
      )}
    </Can>
  )
})
