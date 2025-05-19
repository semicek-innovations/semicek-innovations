import { Guard } from '@/components/guard'

import { ProtectedSidebar } from './_sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Guard can={['get', 'User']}>
      <ProtectedSidebar>{children}</ProtectedSidebar>
    </Guard>
  )
}
