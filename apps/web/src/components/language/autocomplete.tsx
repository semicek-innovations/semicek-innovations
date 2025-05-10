'use client'

import { SupportedLanguage } from '@semicek-innovations/i18n'
import { useRouter } from 'next/navigation'

import { Autocomplete } from '../autocomplete'
import { languages } from './consts'
import { useLanguage } from './context'

const languageSelectTexts = {
  label: {
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    de: 'Sprache',
    'pt-BR': 'Idioma'
  },
  placeholder: {
    en: 'Select language',
    es: 'Selecciona el idioma',
    fr: 'Sélectionnez la langue',
    de: 'Sprache wählen',
    'pt-BR': 'Selecione o idioma'
  }
}

export function LanguageAutocomplete() {
  const router = useRouter()
  const { language, setLanguage, multiLangText } = useLanguage()

  const handleLanguageChange = (key: React.Key | null) => () => {
    setLanguage(key as SupportedLanguage)
    router.refresh()
  }

  return (
    <Autocomplete
      label={multiLangText(languageSelectTexts.label)}
      placeholder={multiLangText(languageSelectTexts.placeholder)}
      className="max-w-xs"
      items={languages}
      valueKey="code"
      labelKey="name"
      selectedKey={language}
      onSelectionChange={handleLanguageChange}
      isClearable={false}
    />
  )
}
