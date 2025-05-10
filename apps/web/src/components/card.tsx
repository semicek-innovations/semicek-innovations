'use client'

import { Card as HeroUICard, CardBody, CardFooter, CardHeader, CardProps as HeroUICardProps } from '@heroui/react'
import { forwardRef } from 'react'

export type CardProps = React.ComponentPropsWithoutRef<typeof HeroUICard> & Omit<HeroUICardProps, 'ref'>

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader
  Body: typeof CardBody
  Footer: typeof CardFooter
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { isBlurred = true, classNames, ...rest },
  ref
) {
  return (
    <HeroUICard
      ref={ref}
      classNames={{
        ...classNames,
        base: ['bg-background/60 dark:bg-background/75', classNames?.base]
      }}
      isBlurred={isBlurred}
      {...rest}
    />
  )
}) as CardComponent

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
