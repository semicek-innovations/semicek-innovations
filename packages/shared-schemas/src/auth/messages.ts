export const RESET_TOKEN_REQUIRED = 'Reset token is required.'
export const RESET_TOKEN_INVALID_TYPE = 'Reset token must be a string.'

export const authValidationMessages = {
  [RESET_TOKEN_REQUIRED]: {
    en: RESET_TOKEN_REQUIRED,
    es: 'El token de restablecimiento es obligatorio.',
    fr: 'Le jeton de réinitialisation est requis.',
    de: 'Der Zurücksetzungstoken ist erforderlich.',
    'pt-BR': 'O token de redefinição é obrigatório.'
  },
  [RESET_TOKEN_INVALID_TYPE]: {
    en: RESET_TOKEN_INVALID_TYPE,
    es: 'El token de restablecimiento debe ser una cadena.',
    fr: 'Le jeton de réinitialisation doit être une chaîne.',
    de: 'Der Zurücksetzungstoken muss eine Zeichenkette sein.',
    'pt-BR': 'O token de redefinição deve ser uma string.'
  }
}
