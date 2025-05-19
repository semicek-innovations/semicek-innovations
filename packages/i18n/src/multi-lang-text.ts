import { matchLang } from './match-lang'
import { Language, LanguageText } from './types'

export interface MultiLangTextOptions {
  fallbackLang?: Language
  lang?: Language
}

export function multiLangText(texts: LanguageText, options: MultiLangTextOptions = {}) {
  const { fallbackLang = 'en', lang = fallbackLang } = options
  const availableLangs = Object.keys(texts) as Language[]
  const matchedLang = matchLang(availableLangs, lang, fallbackLang)
  return texts[matchedLang] ?? ''
}
