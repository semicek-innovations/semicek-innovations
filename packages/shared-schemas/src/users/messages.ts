export const USERNAME_INVALID_CHARS = 'Username can only contain letters, numbers, periods, and underscores.'
export const USERNAME_CONSECUTIVE_PERIODS = 'Username cannot contain consecutive periods.'
export const USERNAME_CONSECUTIVE_UNDERSCORES = 'Username cannot contain consecutive underscores.'
export const USERNAME_START_INVALID = 'Username cannot start with a period or underscore.'
export const USERNAME_END_INVALID = 'Username cannot end with a period or underscore.'
export const USERNAME_TOO_SHORT = 'Username must be at least 3 characters long.'
export const USERNAME_TOO_LONG = 'Username must be at most 30 characters long.'

export const PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long.'
export const PASSWORD_TOO_LONG = 'Password must be at most 64 characters long.'

export const INVALID_CREDENTIALS = 'Invalid credentials.'

export const userValidationMessages = {
  [USERNAME_INVALID_CHARS]: {
    en: USERNAME_INVALID_CHARS,
    es: 'El nombre de usuario solo puede contener letras, números, puntos y guiones bajos.',
    fr: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des points et des tirets bas.",
    de: 'Der Benutzername darf nur Buchstaben, Zahlen, Punkte und Unterstriche enthalten.',
    'pt-BR': 'O nome de usuário só pode conter letras, números, pontos e underlines.'
  },
  [USERNAME_CONSECUTIVE_PERIODS]: {
    en: USERNAME_CONSECUTIVE_PERIODS,
    es: 'El nombre de usuario não puede contener puntos consecutivos.',
    fr: "Le nom d'utilisateur ne peut pas contenir de points consécutifs.",
    de: 'Der Benutzername darf keine aufeinanderfolgenden Punkte enthalten.',
    'pt-BR': 'O nome de usuário não pode conter pontos consecutivos.'
  },
  [USERNAME_CONSECUTIVE_UNDERSCORES]: {
    en: USERNAME_CONSECUTIVE_UNDERSCORES,
    es: 'El nombre de usuario no puede contener guiones bajos consecutivos.',
    fr: "Le nom d'utilisateur ne peut pas contenir de tirets bas consécutifs.",
    de: 'Der Benutzername darf keine aufeinanderfolgenden Unterstriche enthalten.',
    'pt-BR': 'O nome de usuário não pode conter underlines consecutivos.'
  },
  [USERNAME_START_INVALID]: {
    en: USERNAME_START_INVALID,
    es: 'El nombre de usuario no puede comenzar con un punto o guion bajo.',
    fr: "Le nom d'utilisateur ne peut pas commencer par un point ou un tiret bas.",
    de: 'Der Benutzername darf nicht mit einem Punkt oder Unterstrich beginnen.',
    'pt-BR': 'O nome de usuário não pode começar com ponto ou underline.'
  },
  [USERNAME_END_INVALID]: {
    en: USERNAME_END_INVALID,
    es: 'El nombre de usuario no puede terminar con un punto o guion bajo.',
    fr: "Le nom d'utilisateur ne peut pas se terminer par un point ou un tiret bas.",
    de: 'Der Benutzername darf nicht mit einem Punkt oder Unterstrich enden.',
    'pt-BR': 'O nome de usuário não pode terminar com ponto ou underline.'
  },
  [USERNAME_TOO_SHORT]: {
    en: USERNAME_TOO_SHORT,
    es: 'El nombre de usuario debe tener al menos 3 caracteres.',
    fr: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    de: 'Der Benutzername muss mindestens 3 Zeichen lang sein.',
    'pt-BR': 'O nome de usuário deve ter no mínimo 3 caracteres.'
  },
  [USERNAME_TOO_LONG]: {
    en: USERNAME_TOO_LONG,
    es: 'El nombre de usuario debe tener como máximo 30 caracteres.',
    fr: "Le nom d'utilisateur doit contenir au maximum 30 caractères.",
    de: 'Der Benutzername darf höchstens 30 Zeichen lang sein.',
    'pt-BR': 'O nome de usuário deve ter no máximo 30 caracteres.'
  },
  [PASSWORD_TOO_SHORT]: {
    en: PASSWORD_TOO_SHORT,
    es: 'La contraseña debe tener al menos 8 caracteres.',
    fr: 'Le mot de passe doit contenir au moins 8 caractères.',
    de: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
    'pt-BR': 'A senha deve ter pelo menos 8 caracteres.'
  },
  [PASSWORD_TOO_LONG]: {
    en: PASSWORD_TOO_LONG,
    es: 'La contraseña debe tener como máximo 64 caracteres.',
    fr: 'Le mot de passe doit contenir au maximum 64 caractères.',
    de: 'Das Passwort darf höchstens 64 Zeichen lang sein.',
    'pt-BR': 'A senha deve ter no máximo 64 caracteres.'
  },
  [INVALID_CREDENTIALS]: {
    en: INVALID_CREDENTIALS,
    es: 'Credenciales inválidas.',
    fr: 'Identifiants invalides.',
    de: 'Ungültige Anmeldeinformationen.',
    'pt-BR': 'Credenciais inválidas.'
  }
}
