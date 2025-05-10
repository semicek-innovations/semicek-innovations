'use client'

import { LanguageText, SupportedLanguage } from '@semicek-innovations/i18n'
import { useEffect, useState } from 'react'

import { cookies } from '@/lib/cookies'
import { multiLangText as originalMultiLangText } from '@/lib/i18n'

const supportedLanguages: SupportedLanguage[] = ['en', 'es', 'fr', 'de', 'pt-BR']

function getBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'
  const browserLang = navigator.language as SupportedLanguage
  return supportedLanguages.includes(browserLang) ? browserLang : 'en'
}

function getSavedLanguage(): SupportedLanguage {
  return cookies.get<SupportedLanguage>('preferred-language') || getBrowserLanguage()
}

export type LanguageState = {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  multiLangText: (texts: LanguageText) => string
}

const listeners: Array<(state: LanguageState) => void> = []

let languageState: LanguageState = {
  language: getSavedLanguage(),
  setLanguage,
  multiLangText
}

export function getLanguageState(): LanguageState {
  return languageState
}

function reducer(state: LanguageState, action: { type: 'SET'; lang: SupportedLanguage }): LanguageState {
  switch (action.type) {
    case 'SET':
      return { ...state, language: action.lang }
  }
}

function dispatch(action: Parameters<typeof reducer>[1]) {
  languageState = reducer(languageState, action)
  listeners.forEach(listener => listener(languageState))
}

export function setLanguage(lang: SupportedLanguage) {
  cookies.set('preferred-language', lang)
  dispatch({ type: 'SET', lang })
}

export function multiLangText(texts: LanguageText): string {
  return originalMultiLangText(texts, { lang: languageState.language })
}

export function subscribeLanguage(listener: (state: LanguageState) => void) {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index !== -1) listeners.splice(index, 1)
  }
}

export function useLanguage() {
  const [state, setState] = useState(getLanguageState())

  useEffect(() => {
    return subscribeLanguage(setState)
  }, [])

  return state
}
