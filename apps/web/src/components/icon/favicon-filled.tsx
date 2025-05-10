'use client'

import { cn } from '@heroui/react'
import React from 'react'

import { Icon, IconProps } from '.'

export interface FaviconFilledProps extends IconProps {
  classNames?: {
    base?: string
    square1?: string
    square2?: string
    square3?: string
    square4?: string
    square5?: string
    S?: string
  }
}

export const FaviconFilled = React.forwardRef<SVGSVGElement, FaviconFilledProps>(function FaviconFilled(
  { viewBox = '0 0 462 446', className, classNames = {}, ...props },
  ref
) {
  return (
    <Icon ref={ref} viewBox={viewBox} className={cn(className, classNames.base)} {...props}>
      <rect width="462" height="446" rx="105" className={cn('text-primary', classNames?.square1)} fill="currentColor" />
      <rect
        x="67"
        y="66"
        width="96"
        height="94"
        rx="18"
        className={cn('text-secondary', classNames?.square2)}
        fill="currentColor"
      />
      <rect
        x="67"
        y="180"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-a', classNames?.square3)}
        fill="currentColor"
      />
      <rect
        x="67"
        y="294"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-b', classNames?.square4)}
        fill="currentColor"
      />
      <rect
        x="183"
        y="294"
        width="96"
        height="94"
        rx="18"
        className={cn('text-violet-c', classNames?.square5)}
        fill="currentColor"
      />
      <path
        d="M243.008 62.0001H370.5C370.5 62.0001 382.508 61.5001 382.508 74.0001V107.5C382.508 118.5 370.5 118.5 370.5 118.5H257.508C245.508 123.5 248.508 139 248.508 139C248.008 154.5 311.008 167.5 311.008 167.5C356.008 180.5 366.508 188.5 366.508 188.5C401.508 212.5 401.508 253 401.508 253V280.5C393.508 391 297.008 387.5 297.008 387.5V343C341.508 324 341.508 273.5 341.508 273.5C342.008 246.5 324.008 236.5 324.008 236.5C310.508 228 243.008 209 243.008 209C183.008 186 185.008 144.5 185.008 144.5V122C190.008 68.5001 243.008 62.0001 243.008 62.0001Z"
        className={cn('text-background', classNames?.S)}
        fill="currentColor"
      />
    </Icon>
  )
})
