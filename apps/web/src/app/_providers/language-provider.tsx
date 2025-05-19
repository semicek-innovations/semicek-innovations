'use client'

import { Language, LanguageText } from '@semicek-innovations/i18n'
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useState } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { cookies } from '@/lib/cookies'
import { multiLangText } from '@/lib/i18n'

export interface LanguageContextProps {
  language: Language
  setLanguage: (lang: Language) => void
  multiLangText: (texts: LanguageText) => string
}

export const LanguageContext = createContext({} as LanguageContextProps)

function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language as Language
  cookies.set('preferred-language', browserLang)
  return browserLang
}

function getSavedLanguage(): Language {
  return cookies.get<Language>('preferred-language') || getBrowserLanguage()
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [language, setLanguage] = useState(getSavedLanguage)
  const isMounted = useIsMounted(router.refresh)

  const handleMultiLangText = useCallback(
    (texts: LanguageText) => {
      return multiLangText(texts, { lang: language })
    },
    [language]
  )

  const handleSetLanguage = useCallback((lang: Language) => {
    cookies.set('preferred-language', lang)
    setLanguage(lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, multiLangText: handleMultiLangText }}>
      {isMounted ? children : null}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
