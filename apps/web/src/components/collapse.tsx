'use client'

import { tv, VariantProps } from '@heroui/react'
import { MergeTypes } from '@semicek-innovations/shared-utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { TRANSITION_VARIANTS } from '@/lib/transition-utils'

const collapse = tv({
  base: 'overflow-hidden'
})

export type CollapseVariantProps = VariantProps<typeof collapse>
export type CollapseSlots = keyof ReturnType<typeof collapse>

export interface CollapseProps extends MergeTypes<ComponentPropsWithoutRef<typeof motion.div>, CollapseVariantProps> {
  isOpen: boolean
  animate?: boolean
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { children, isOpen, animate = true, className, ...rest },
  ref
) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          animate="enter"
          exit="exit"
          initial="exit"
          variants={animate ? TRANSITION_VARIANTS.collapse : undefined}
          className={collapse({ className })}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
