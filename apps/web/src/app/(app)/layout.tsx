import { Navbar } from '@/components/navbar'
import { generateMultiLangMetadata } from '@/lib/i18n'

import { Providers } from '../_providers'
import { metadataTexts } from '../consts'

export function generateMetadata() {
  return generateMultiLangMetadata({ ...metadataTexts, template: '%s | Semicek Innovations' })
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  )
}
