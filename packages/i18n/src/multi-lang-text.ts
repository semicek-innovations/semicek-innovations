import { Language, LanguageText } from './types'

export interface MultiLangTextOptions {
  fallbackLang?: Language
  lang?: Language
}

export function multiLangText(texts: LanguageText, options: MultiLangTextOptions = {}) {
  const { fallbackLang = 'en', lang = fallbackLang } = options

  // 1. Exact match
  if (texts[lang]) return texts[lang] as string

  // 2. Base language match (e.g., 'en-US' -> 'en')
  const baseLang = lang.split('-')[0] as Language
  if (texts[baseLang]) return texts[baseLang] as string

  // 3. Regional variant match (e.g., 'en' → 'en-US')
  const variantKey = Object.keys(texts).find(k => k.startsWith(`${baseLang}-`)) as Language
  if (variantKey) return texts[variantKey] as string

  // 4. Fallback language
  if (texts[fallbackLang]) return texts[fallbackLang] as string

  const fallbackBase = fallbackLang.split('-')[0] as Language
  if (texts[fallbackBase]) return texts[fallbackBase] as string

  const fallbackVariantKey = Object.keys(texts).find(k => k.startsWith(`${fallbackBase}-`)) as Language
  if (fallbackVariantKey) return texts[fallbackVariantKey] as string

  // 5. First available translation
  return Object.values(texts)[0]
}
