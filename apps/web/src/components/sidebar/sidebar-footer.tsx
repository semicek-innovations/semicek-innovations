'use client'

import { tv } from '@heroui/react'
import { forwardRef } from 'react'

const sidebarFooter = tv({
  base: 'flex w-full p-2.5 pt-0'
})

export const SidebarFooter = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(function SidebarFooter(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={sidebarFooter({ className })} {...props} />
})
