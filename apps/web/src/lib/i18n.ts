import {
  LanguageText,
  multiLangText as originalMultiLangText,
  MultiLangTextOptions,
  SupportedLanguage,
  SupportedLanguageText
} from '@semicek-innovations/i18n'
import { Metadata } from 'next'

import { cookies } from '@/lib/cookies'

export function multiLangText(texts: LanguageText, options: MultiLangTextOptions = {}) {
  const { fallbackLang = 'en', lang = cookies.get<SupportedLanguage>('preferred-language') } = options
  return originalMultiLangText(texts, { fallbackLang, lang })
}

export interface GenerateMultiLangMetadataProps extends Omit<Metadata, 'title' | 'description' | 'keywords'> {
  title: SupportedLanguageText
  template?: string
  description?: SupportedLanguageText
  keywords?: SupportedLanguageText
}

export async function generateMultiLangMetadata({
  title,
  template,
  description,
  keywords,
  ...props
}: GenerateMultiLangMetadataProps) {
  const [serverCookies] = await cookies.server()
  const saved = serverCookies.get<SupportedLanguage>('preferred-language')

  const metadata: Metadata = {
    ...props,
    title: multiLangText(title, { lang: saved })
  }

  if (template) {
    metadata.title = {
      default: multiLangText(title, { lang: saved }),
      template
    }
  }

  if (description) metadata.description = multiLangText(description, { lang: saved })
  if (keywords) metadata.keywords = multiLangText(keywords, { lang: saved }).split(', ')

  return metadata
}
