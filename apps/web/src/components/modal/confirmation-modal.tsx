'use client'

import { MaybePromise, maybePromise } from '@semicek-innovations/shared-utils'

import { Modal, useConfirmationModal } from '@/components/modal'

import { Button } from '../button'
import { MultiLangText } from '../language'

export const confirmationModalTexts = {
  cancel: {
    en: 'Cancel',
    'pt-BR': 'Cancelar',
    es: 'Cancelar',
    fr: 'Annuler',
    de: 'Abbrechen'
  },
  confirm: {
    en: 'Confirm',
    'pt-BR': 'Confirmar',
    es: 'Confirmar',
    fr: 'Confirmer',
    de: 'Bestätigen'
  }
}

export function ConfirmationModal() {
  const { question, onConfirm, onCancel, isLoading, setIsLoading, confirmationModal, ...rest } = useConfirmationModal()

  const handleAction = (action?: MaybePromise<() => void>, setLoading?: boolean) => async () => {
    setLoading && setIsLoading(true)
    await maybePromise(action)
    setLoading && setIsLoading(false)
    confirmationModal.close()
  }

  return (
    <Modal
      onClose={handleAction(onCancel)}
      fullScreen={false}
      isKeyboardDismissDisabled={false}
      classNames={{ header: 'pb-0' }}
      isDismissable
      {...rest}
    >
      <Modal.Body>
        <p>{question}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" color="default" onPress={handleAction(onCancel)}>
          <MultiLangText texts={confirmationModalTexts.cancel} />
        </Button>
        <Button size="sm" onPress={handleAction(onConfirm, true)} isLoading={isLoading}>
          <MultiLangText texts={confirmationModalTexts.confirm} />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
