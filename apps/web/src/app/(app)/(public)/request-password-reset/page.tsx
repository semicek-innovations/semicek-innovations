import { Guard } from '@/components/guard'
import { generateMultiLangMetadata } from '@/lib/i18n'

import RequestPasswordReset from '.'
import { requestPasswordResetMetadataTexts } from './consts'

export function generateMetadata() {
  return generateMultiLangMetadata(requestPasswordResetMetadataTexts)
}

export default function Page() {
  return (
    <Guard cannot={['get', 'User']}>
      <RequestPasswordReset />
    </Guard>
  )
}
