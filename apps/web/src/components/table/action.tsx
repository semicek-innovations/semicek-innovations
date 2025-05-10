'use client'

import { SlotsToClasses, Tooltip, TooltipProps, tv } from '@heroui/react'
import { ComponentPropsWithoutRef } from 'react'

import { IconType } from '../icon'

const tableAction = tv({
  slots: {
    base: 'cursor-pointer text-default-400 active:opacity-50',
    icon: 'shrink-0'
  },
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      foreground: 'text-foreground',
      default: ''
    }
  }
})

export interface TableActionProps extends ComponentPropsWithoutRef<'span'> {
  icon: IconType
  size?: number
  tooltip?: string
  color?: TooltipProps['color']
  classNames?: SlotsToClasses<keyof ReturnType<typeof tableAction>> & {
    tooltip?: TooltipProps['classNames']
  }
}

export function TableAction({
  icon: Icon,
  size = 20,
  tooltip,
  color = 'default',
  classNames,
  className,
  ...props
}: TableActionProps) {
  const { base, icon } = tableAction({ color })

  return (
    <Tooltip color={color} classNames={classNames?.tooltip} content={tooltip} isDisabled={!tooltip}>
      <span className={base({ class: [classNames?.base, className] })} {...props}>
        <Icon className={icon({ class: classNames?.icon })} width={size} height={size} />
      </span>
    </Tooltip>
  )
}

export interface TableActionWrapperProps extends ComponentPropsWithoutRef<'div'> {}

const tableActionWrapper = tv({
  base: 'relative flex items-center justify-around gap-2'
})

export function TableActionWrapper({ className, ...props }: TableActionWrapperProps) {
  return <div className={tableActionWrapper({ className })} {...props} />
}
