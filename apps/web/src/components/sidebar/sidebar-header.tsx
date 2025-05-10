'use client'

import { tv } from '@heroui/react'
import { forwardRef } from 'react'

const sidebarHeader = tv({
  base: 'flex w-full p-2.5 pb-0'
})

export const SidebarHeader = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function SidebarHeader(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={sidebarHeader({ className })} {...props} />
})
