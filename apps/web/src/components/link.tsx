'use client'

import { Link as HeroUILink, LinkProps as HeroUILinkProps } from '@heroui/react'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export type LinkProps = HeroUILinkProps

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ as = NextLink, ...rest }, ref) {
  return <HeroUILink ref={ref} as={as} {...rest} />
})
