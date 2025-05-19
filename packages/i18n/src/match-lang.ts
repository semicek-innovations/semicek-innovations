import { Language } from './types'

export function matchLang(available: Language[], target: Language, fallback: Language = 'en') {
  // 1. Exact match
  if (available.includes(target)) return target

  // 2. Base language match (e.g., 'en-US' -> 'en')
  const baseLang = target.split('-')[0]
  if (available.includes(baseLang as Language)) return baseLang as Language

  // 3. Regional variant match (e.g., 'en' → 'en-US')
  const regionalVariant = available.find(lang => lang.startsWith(`${baseLang}-`))
  if (regionalVariant) return regionalVariant

  // 4. Fallback language exact match
  if (available.includes(fallback)) return fallback

  // 5. Fallback base language match
  const fallbackBase = fallback.split('-')[0]
  if (available.includes(fallbackBase as Language)) return fallbackBase as Language

  // 6. Fallback regional variant
  const fallbackVariant = available.find(lang => lang.startsWith(`${fallbackBase}-`))
  if (fallbackVariant) return fallbackVariant

  // 7. First available language
  return available[0]
}
