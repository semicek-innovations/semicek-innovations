'use client'

import { tv } from '@heroui/react'
import { forwardRef } from 'react'

const sidebarBody = tv({
  base: 'flex grow flex-col overflow-y-auto overflow-x-hidden p-2.5'
})

export const SidebarBody = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function SidebarBody(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={sidebarBody({ className })} {...props} />
})
