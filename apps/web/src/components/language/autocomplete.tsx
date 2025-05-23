'use client'

import { matchLang, SupportedLanguage } from '@semicek-innovations/i18n'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/app/_providers/language-provider'

import { Autocomplete } from '../autocomplete'
import { languages, supportedLanguages } from './consts'

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
      selectedKey={matchLang(supportedLanguages, language)}
      onSelectionChange={handleLanguageChange}
      isClearable={false}
    />
  )
}
