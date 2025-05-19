'use client'

import { LanguageText, SupportedLanguage } from '@semicek-innovations/i18n'
import { createContext, useCallback, useContext, useState } from 'react'

import { cookies } from '@/lib/cookies'
import { multiLangText } from '@/lib/i18n'

export interface LanguageContextProps {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  multiLangText: (texts: LanguageText) => string
}

export const LanguageContext = createContext({} as LanguageContextProps)

function getBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language as SupportedLanguage
  cookies.set('preferred-language', browserLang)
  return browserLang
}

function getSavedLanguage(): SupportedLanguage {
  return cookies.get<SupportedLanguage>('preferred-language') || getBrowserLanguage()
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(getSavedLanguage)

  const handleMultiLangText = useCallback(
    (texts: LanguageText) => {
      return multiLangText(texts, { lang: language })
    },
    [language]
  )

  const handleSetLanguage = useCallback((lang: SupportedLanguage) => {
    cookies.set('preferred-language', lang)
    setLanguage(lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, multiLangText: handleMultiLangText }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
