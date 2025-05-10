'use client'

import React from 'react'

export type IconProps = React.ComponentPropsWithoutRef<
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
  >
>

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { title, titleId, children, ...props },
  ref
) {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'aria-hidden': 'true',
        'data-slot': 'icon',
        'aria-labelledby': titleId,
        ref
      },
      props
    ),
    title
      ? React.createElement(
          'title',
          {
            id: titleId
          },
          title
        )
      : null,
    ...(Array.isArray(children) ? children : [children])
  )
})

export type IconType = typeof Icon
