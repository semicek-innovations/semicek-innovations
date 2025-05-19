'use client'

import { LanguageText } from '@semicek-innovations/i18n'

import { useLanguage } from '@/app/_providers/language-provider'

export interface MultiLangTextProps {
  texts: LanguageText
}

export function MultiLangText({ texts }: MultiLangTextProps) {
  const { multiLangText } = useLanguage()
  return multiLangText(texts)
}
