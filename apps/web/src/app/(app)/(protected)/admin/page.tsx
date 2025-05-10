import { generateMultiLangMetadata } from '@/lib/i18n'

import { metadataTexts } from './consts'

export function generateMetadata() {
  // This is a special case for the admin page, where we want to set the robots meta tag to noindex, nofollow
  // to prevent search engines from indexing this page.
  return generateMultiLangMetadata({ ...metadataTexts, robots: 'noindex, nofollow' })
}

export default function Page() {
  return (
    <div className="mx-auto flex flex-col gap-2 py-4">
      <h1>ADMIN</h1>
    </div>
  )
}
