'use client'

import { Avatar } from '@heroui/react'
import { SupportedLanguage } from '@semicek-innovations/i18n'

import { AutocompleteItemProps } from '../autocomplete'

export const languages: {
  code: string
  name: string
  localizedNames: Record<SupportedLanguage, string>
  avatar: string
  props: Required<Pick<AutocompleteItemProps, 'startContent'>>
}[] = [
  {
    code: 'en',
    name: 'English',
    localizedNames: {
      en: 'English',
      es: 'Inglés',
      fr: 'Anglais',
      de: 'Englisch',
      'pt-BR': 'Inglês'
    },
    avatar: 'https://flagcdn.com/us.svg',
    props: {
      startContent: <Avatar alt="United States" className="h-5 w-5" src="https://flagcdn.com/us.svg" />
    }
  },
  {
    code: 'es',
    name: 'Español',
    localizedNames: {
      en: 'Spanish',
      es: 'Español',
      fr: 'Espagnol',
      de: 'Spanisch',
      'pt-BR': 'Espanhol'
    },
    avatar: 'https://flagcdn.com/es.svg',
    props: {
      startContent: <Avatar alt="Spain" className="h-5 w-5" src="https://flagcdn.com/es.svg" />
    }
  },
  {
    code: 'fr',
    name: 'Français',
    localizedNames: {
      en: 'French',
      es: 'Francés',
      fr: 'Français',
      de: 'Französisch',
      'pt-BR': 'Francês'
    },
    avatar: 'https://flagcdn.com/fr.svg',
    props: {
      startContent: <Avatar alt="France" className="h-5 w-5" src="https://flagcdn.com/fr.svg" />
    }
  },
  {
    code: 'de',
    name: 'Deutsch',
    localizedNames: {
      en: 'German',
      es: 'Alemán',
      fr: 'Allemand',
      de: 'Deutsch',
      'pt-BR': 'Alemão'
    },
    avatar: 'https://flagcdn.com/de.svg',
    props: {
      startContent: <Avatar alt="Germany" className="h-5 w-5" src="https://flagcdn.com/de.svg" />
    }
  },
  {
    code: 'pt-BR',
    name: 'Português (Brasil)',
    localizedNames: {
      en: 'Portuguese (Brazil)',
      es: 'Portugués (Brasil)',
      fr: 'Portugais (Brésil)',
      de: 'Portugiesisch (Brasilien)',
      'pt-BR': 'Português (Brasil)'
    },
    avatar: 'https://flagcdn.com/br.svg',
    props: {
      startContent: <Avatar alt="Brazil" className="h-5 w-5" src="https://flagcdn.com/br.svg" />
    }
  }
]
