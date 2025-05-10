'use client'

import { cn } from '@heroui/react'
import React from 'react'

import { Icon, IconProps } from '.'

export interface FaviconProps extends IconProps {
  classNames?: {
    base?: string
    square1?: string
    square2?: string
    square3?: string
    square4?: string
    square5?: string
  }
}

export const Favicon = React.forwardRef<SVGSVGElement, FaviconProps>(function Favicon(
  { viewBox = '0 0 462 446', className, classNames = {}, ...props },
  ref
) {
  return (
    <Icon ref={ref} viewBox={viewBox} className={cn(className, classNames.base)} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M357 0C414.99 5.41183e-06 462 47.0101 462 105V341C462 398.99 414.99 446 357 446H105C47.0101 446 0 398.99 0 341V105C0 47.0101 47.0101 1.6912e-06 105 0H357ZM243.008 62C243.008 62 190.008 68.5 185.008 122V144.5C185.008 144.5 183.008 186 243.008 209C243.008 209 310.508 228 324.008 236.5C324.008 236.5 342.008 246.5 341.508 273.5C341.508 273.5 341.508 324 297.008 343V387.5C297.008 387.5 393.508 391 401.508 280.5V253C401.508 252.965 401.493 212.49 366.508 188.5C366.495 188.491 355.981 180.492 311.008 167.5C310.988 167.496 248.008 154.498 248.508 139C248.504 138.979 245.516 123.497 257.508 118.5H370.5C370.5 118.5 382.508 118.5 382.508 107.5V74C382.508 61.5009 370.5 62 370.5 62H243.008Z"
        className={cn('text-primary', classNames?.square1)}
        fill="currentColor"
      />
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
    </Icon>
  )
})
