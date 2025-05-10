'use client'

import {
  Modal as HeroUIModal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalProps as HeroUIModalProps,
  tv
} from '@heroui/react'

import { useMediaQuery } from '@/hooks/use-media-query'

import { useConfirmationModal } from './use-confirmation-modal'

export interface ModalProps extends Omit<HeroUIModalProps, 'children' | 'classNames'> {
  children: ModalContentProps['children']
  classNames?: HeroUIModalProps['classNames'] & {
    content?: string
    header?: string
  }
  fullScreen?: boolean
}

const modal = tv({
  variants: {
    fullScreen: {
      true: ''
    },
    isSmallScreen: {
      true: ''
    }
  },
  compoundVariants: [
    {
      fullScreen: true,
      isSmallScreen: true,
      class: 'm-0 max-h-full'
    }
  ]
})

export function Modal({
  children,
  title,
  size,
  placement = 'center',
  scrollBehavior = 'inside',
  fullScreen = true,
  classNames,
  className,
  ...rest
}: ModalProps) {
  const { isOpen: isConfirmationModalOpen } = useConfirmationModal()
  const { matches: isSmallScreen } = useMediaQuery({ size: 'sm' })

  if (isConfirmationModalOpen && rest.isDismissable == null) {
    rest.isDismissable = false
  }

  if (isConfirmationModalOpen && rest.isKeyboardDismissDisabled == null) {
    rest.isKeyboardDismissDisabled = true
  }

  return (
    <HeroUIModal
      size={fullScreen && isSmallScreen ? 'full' : size}
      placement={placement}
      scrollBehavior={scrollBehavior}
      classNames={{
        ...classNames,
        wrapper: [scrollBehavior !== 'outside' && 'overflow-hidden', classNames?.wrapper]
      }}
      className={modal({ fullScreen, isSmallScreen, className })}
      {...rest}
    >
      <ModalContent className={classNames?.content}>
        {onClose => {
          return (
            <>
              <ModalHeader className={classNames?.header}>{title}</ModalHeader>
              {typeof children === 'function' ? children(onClose) : children}
            </>
          )
        }}
      </ModalContent>
    </HeroUIModal>
  )
}

Modal.Body = ModalBody
Modal.Footer = ModalFooter
