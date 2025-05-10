'use client'

import { Sidebar, SidebarToggle } from '@/components/sidebar'

import { ProtectedSidebarRoutes } from './sidebar-routes'

export function ProtectedSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar
      content={children}
      classNames={{
        base: 'min-h-[calc(100dvh_-_4rem)] bg-default-50',
        sidebar: 'h-[calc(100dvh_-_4rem)] bg-primary text-primary-foreground'
      }}
    >
      <Sidebar.Header>
        <SidebarToggle className="data-[hover=true]:bg-white/20" />
      </Sidebar.Header>
      <Sidebar.Body>
        <ProtectedSidebarRoutes />
      </Sidebar.Body>
    </Sidebar>
  )
}
