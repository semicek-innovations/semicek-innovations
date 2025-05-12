export const ID_REQUIRED = 'ID is required.'
export const ID_INVALID_TYPE = 'ID must be a string.'

export const INVALID_EMAIL = 'Invalid email address.'
export const EMAIL_ALREADY_REGISTERED = 'Email already registered.'

export const PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long.'
export const PASSWORD_TOO_LONG = 'Password must be at most 64 characters long.'
export const INVALID_CREDENTIALS = 'Invalid credentials.'

export const NAME_REQUIRED = 'Name is required.'
export const NAME_INVALID_TYPE = 'Name must be a string.'
export const NAME_TOO_SHORT = 'Name must be at least 2 characters long.'
export const NAME_TOO_LONG = 'Name must be at most 100 characters long.'

export const USERNAME_INVALID_TYPE = 'Username must be a string.'
export const USERNAME_INVALID_CHARS = 'Username can only contain letters, numbers, periods, and underscores.'
export const USERNAME_CONSECUTIVE_PERIODS = 'Username cannot contain consecutive periods.'
export const USERNAME_CONSECUTIVE_UNDERSCORES = 'Username cannot contain consecutive underscores.'
export const USERNAME_START_INVALID = 'Username cannot start with a period or underscore.'
export const USERNAME_END_INVALID = 'Username cannot end with a period or underscore.'
export const USERNAME_TOO_SHORT = 'Username must be at least 3 characters long.'
export const USERNAME_TOO_LONG = 'Username must be at most 30 characters long.'

export const BIRTHDATE_INVALID_TYPE = 'Birthdate must be a string.'

export const AVATAR_URL_INVALID = 'Invalid avatar URL.'
export const AVATAR_URL_INVALID_TYPE = 'Avatar URL must be a string.'

export const PREFERENCES_INVALID_TYPE = 'Preferences must be an object.'

export const ROLE_INVALID = 'Role must be one of: '

export const SUBSCRIPTION_PLAN_INVALID = 'Subscription plan must be one of: '
export const SUBSCRIPTION_ENDS_INVALID_TYPE = 'Subscription end date must be a string.'

export const IS_ACTIVE_REQUIRED = 'Active status is required.'
export const IS_ACTIVE_INVALID_TYPE = 'Active status must be a boolean.'

export const CREATED_AT_REQUIRED = 'Created at is required.'
export const CREATED_AT_INVALID_TYPE = 'Created at must be a string.'

export const UPDATED_AT_REQUIRED = 'Updated at is required.'
export const UPDATED_AT_INVALID_TYPE = 'Updated at must be a string.'

export const USER_NOT_FOUND = 'User not found.'

export const userValidationMessages = {
  [ID_REQUIRED]: {
    en: ID_REQUIRED,
    es: 'El ID es obligatorio.',
    fr: "L'identifiant est requis.",
    de: 'Die ID ist erforderlich.',
    'pt-BR': 'O ID é obrigatório.'
  },
  [ID_INVALID_TYPE]: {
    en: ID_INVALID_TYPE,
    es: 'El ID debe ser una cadena.',
    fr: "L'identifiant doit être une chaîne.",
    de: 'Die ID muss eine Zeichenkette sein.',
    'pt-BR': 'O ID deve ser uma string.'
  },
  [INVALID_EMAIL]: {
    en: INVALID_EMAIL,
    es: 'Dirección de correo electrónico inválida.',
    fr: 'Adresse e-mail invalide.',
    de: 'Ungültige E-Mail-Adresse.',
    'pt-BR': 'Endereço de e-mail inválido.'
  },
  [EMAIL_ALREADY_REGISTERED]: {
    en: EMAIL_ALREADY_REGISTERED,
    es: 'El correo electrónico ya está registrado.',
    fr: "L'adresse e-mail est déjà enregistrée.",
    de: 'Die E-Mail-Adresse ist bereits registriert.',
    'pt-BR': 'O e-mail já está registrado.'
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
  },
  [NAME_REQUIRED]: {
    en: NAME_REQUIRED,
    es: 'El nombre es obligatorio.',
    fr: 'Le nom est requis.',
    de: 'Der Name ist erforderlich.',
    'pt-BR': 'O nome é obrigatório.'
  },
  [NAME_INVALID_TYPE]: {
    en: NAME_INVALID_TYPE,
    es: 'El nombre debe ser una cadena.',
    fr: 'Le nom doit être une chaîne.',
    de: 'Der Name muss eine Zeichenkette sein.',
    'pt-BR': 'O nome deve ser uma string.'
  },
  [NAME_TOO_SHORT]: {
    en: NAME_TOO_SHORT,
    es: 'El nombre debe tener al menos 2 caracteres.',
    fr: 'Le nom doit contenir au moins 2 caractères.',
    de: 'Der Name muss mindestens 2 Zeichen lang sein.',
    'pt-BR': 'O nome deve ter no mínimo 2 caracteres.'
  },
  [NAME_TOO_LONG]: {
    en: NAME_TOO_LONG,
    es: 'El nombre debe tener como máximo 100 caracteres.',
    fr: 'Le nom doit contenir au maximum 100 caractères.',
    de: 'Der Name darf höchstens 100 Zeichen lang sein.',
    'pt-BR': 'O nome deve ter no máximo 100 caracteres.'
  },
  [USERNAME_INVALID_TYPE]: {
    en: USERNAME_INVALID_TYPE,
    es: 'El nombre de usuario debe ser una cadena.',
    fr: "Le nom d'utilisateur doit être une chaîne.",
    de: 'Der Benutzername muss eine Zeichenkette sein.',
    'pt-BR': 'O nome de usuário deve ser uma string.'
  },
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
  [BIRTHDATE_INVALID_TYPE]: {
    en: BIRTHDATE_INVALID_TYPE,
    es: 'La fecha de nacimiento debe ser una cadena.',
    fr: 'La date de naissance doit être une chaîne.',
    de: 'Das Geburtsdatum muss eine Zeichenkette sein.',
    'pt-BR': 'A data de nascimento deve ser uma string.'
  },
  [AVATAR_URL_INVALID]: {
    en: AVATAR_URL_INVALID,
    es: 'URL de avatar inválida.',
    fr: 'URL de l’avatar invalide.',
    de: 'Ungültige Avatar-URL.',
    'pt-BR': 'URL do avatar inválida.'
  },
  [AVATAR_URL_INVALID_TYPE]: {
    en: AVATAR_URL_INVALID_TYPE,
    es: 'La URL del avatar debe ser una cadena.',
    fr: "L'URL de l'avatar doit être une chaîne.",
    de: 'Die Avatar-URL muss eine Zeichenkette sein.',
    'pt-BR': 'A URL do avatar deve ser uma string.'
  },
  [PREFERENCES_INVALID_TYPE]: {
    en: PREFERENCES_INVALID_TYPE,
    es: 'Las preferencias deben ser un objeto.',
    fr: 'Les préférences doivent être un objet.',
    de: 'Die Einstellungen müssen ein Objekt sein.',
    'pt-BR': 'As preferências devem ser um objeto.'
  },
  [ROLE_INVALID]: {
    en: ROLE_INVALID,
    es: 'El rol debe ser uno de: ',
    fr: "Le rôle doit être l'un des suivants : ",
    de: 'Die Rolle muss eine der folgenden sein: ',
    'pt-BR': 'A função deve ser uma das seguintes: '
  },
  [SUBSCRIPTION_PLAN_INVALID]: {
    en: SUBSCRIPTION_PLAN_INVALID,
    es: 'El plan de suscripción debe ser uno de: ',
    fr: "Le plan d'abonnement doit être l'un des suivants : ",
    de: 'Der Abonnementplan muss einer der folgenden sein: ',
    'pt-BR': 'O plano de assinatura deve ser um dos seguintes: '
  },
  [SUBSCRIPTION_ENDS_INVALID_TYPE]: {
    en: SUBSCRIPTION_ENDS_INVALID_TYPE,
    es: 'La fecha de finalización de la suscripción debe ser una cadena.',
    fr: "La date de fin d'abonnement doit être une chaîne.",
    de: 'Das Ende-Datum des Abos muss eine Zeichenkette sein.',
    'pt-BR': 'A data de término da assinatura deve ser uma string.'
  },
  [IS_ACTIVE_REQUIRED]: {
    en: IS_ACTIVE_REQUIRED,
    es: 'El estado activo es obligatorio.',
    fr: 'Le statut actif est requis.',
    de: 'Der aktive Status ist erforderlich.',
    'pt-BR': 'O status ativo é obrigatório.'
  },
  [IS_ACTIVE_INVALID_TYPE]: {
    en: IS_ACTIVE_INVALID_TYPE,
    es: 'El estado activo debe ser un booleano.',
    fr: 'Le statut actif doit être un booléen.',
    de: 'Der aktive Status muss ein boolescher Wert sein.',
    'pt-BR': 'O status ativo deve ser um booleano.'
  },
  [CREATED_AT_REQUIRED]: {
    en: CREATED_AT_REQUIRED,
    es: 'La fecha de creación es obligatoria.',
    fr: 'La date de création est requise.',
    de: 'Das Erstellungsdatum ist erforderlich.',
    'pt-BR': 'A data de criação é obrigatória.'
  },
  [CREATED_AT_INVALID_TYPE]: {
    en: CREATED_AT_INVALID_TYPE,
    es: 'La fecha de creación debe ser una cadena.',
    fr: 'La date de création doit être une chaîne.',
    de: 'Das Erstellungsdatum muss eine Zeichenkette sein.',
    'pt-BR': 'A data de criação deve ser uma string.'
  },
  [UPDATED_AT_REQUIRED]: {
    en: UPDATED_AT_REQUIRED,
    es: 'La fecha de actualización es obligatoria.',
    fr: 'La date de mise à jour est requise.',
    de: 'Das Aktualisierungsdatum ist erforderlich.',
    'pt-BR': 'A data de atualização é obrigatória.'
  },
  [UPDATED_AT_INVALID_TYPE]: {
    en: UPDATED_AT_INVALID_TYPE,
    es: 'La fecha de actualización debe ser una cadena.',
    fr: 'La date de mise à jour doit être une chaîne.',
    de: 'Das Aktualisierungsdatum muss eine Zeichenkette sein.',
    'pt-BR': 'A data de atualização deve ser uma string.'
  },
  [USER_NOT_FOUND]: {
    en: USER_NOT_FOUND,
    es: 'Usuario no encontrado.',
    fr: 'Utilisateur introuvable.',
    de: 'Benutzer nicht gefunden.',
    'pt-BR': 'Usuário não encontrado.'
  }
}
