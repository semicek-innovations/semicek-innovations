'use client'

import { SlotsToClasses, tv } from '@heroui/react'

import { Button, ButtonProps } from '../button'
import { IconType, SidebarIcon } from '../icon'
import { useSidebar } from './context'

const toggle = tv({
  slots: {
    base: 'h-auto min-w-0 p-1.5 text-inherit',
    icon: 'w-7 shrink-0'
  }
})

export interface SidebarToggleProps extends Omit<ButtonProps, 'children' | 'onPress' | 'content'> {
  icon?: IconType
  content?: React.ReactNode | ((icon: IconType) => React.ReactNode)
  classNames?: SlotsToClasses<keyof ReturnType<typeof toggle>>
}

export function SidebarToggle({
  icon: Icon = SidebarIcon,
  content,
  className,
  classNames,
  isIconOnly = !!content,
  ...props
}: SidebarToggleProps) {
  const { toggleOpen } = useSidebar()
  const classes = toggle()

  return (
    <Button
      variant="light"
      className={classes.base({ class: [className, classNames?.base] })}
      onPress={toggleOpen}
      isIconOnly={isIconOnly}
      {...props}
    >
      {typeof content === 'function'
        ? content(Icon)
        : (content ?? <Icon className={classes.icon({ class: classNames?.icon })} />)}
    </Button>
  )
}
