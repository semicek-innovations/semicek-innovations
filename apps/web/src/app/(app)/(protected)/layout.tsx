import { ProtectedSidebar } from './_sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedSidebar>{children}</ProtectedSidebar>
}
