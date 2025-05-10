import { MaybePromise } from '@semicek-innovations/shared-utils'

import { ModalProps } from '@/components/modal'

export interface ConfirmationModalState extends Pick<ModalProps, 'size'> {
  isOpen: boolean
  title?: string
  question?: string
  isLoading?: boolean
  onConfirm?: MaybePromise<() => any>
  onCancel?: MaybePromise<() => any>
}

export const actionTypes = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE'
} as const

export type ActionType = typeof actionTypes

export type Action =
  | {
      type: ActionType['OPEN']
      modal: Omit<ConfirmationModalState, 'isOpen'>
    }
  | {
      type: ActionType['CLOSE']
    }
