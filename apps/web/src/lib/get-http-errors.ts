import { HTTPError } from 'ky'

import { multiLangText } from './i18n'
import { isFieldErrorsShape } from './is-field-errors-shape'

const unexpectedErrorMessage = {
  en: 'An unexpected error has occurred. Please try again later.',
  es: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.',
  fr: 'Une erreur inattendue s’est produite. Veuillez réessayer plus tard.',
  de: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal.',
  'pt-BR': 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
}

export async function getErrors(err: any) {
  let error = err
  if (err instanceof HTTPError) error = await error.response.json()

  if (!isFieldErrorsShape(error))
    return {
      success: false,
      errors: undefined,
      message: (error.message as string) ?? multiLangText(unexpectedErrorMessage)
    } as const

  return { success: false, errors: error.errors, message: undefined } as const
}
