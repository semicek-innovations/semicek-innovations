import { Guard } from '@/components/guard'
import { generateMultiLangMetadata } from '@/lib/i18n'

import ResetPassword from '.'
import { resetPasswordMetadataTexts } from './consts'

export function generateMetadata() {
  return generateMultiLangMetadata(resetPasswordMetadataTexts)
}

export default function Page() {
  return (
    <Guard cannot={['get', 'User']}>
      <ResetPassword />
    </Guard>
  )
}
