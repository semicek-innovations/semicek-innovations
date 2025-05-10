'use client'

import { createContext, useCallback, useContext, useState } from 'react'

export interface SidebarContextType {
  isOpen: boolean
  isOpenComplete: boolean
  isCloseComplete: boolean
  toggleOpen: () => void
}

export const SidebarContext = createContext({} as SidebarContextType)

export const useSidebar = () => useContext(SidebarContext)

export function useSidebarStates() {
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenComplete, setIsOpenComplete] = useState(true)
  const [isCloseComplete, setIsCloseComplete] = useState(false)

  const handleSetIsOpen = useCallback((...props: Parameters<typeof setIsOpen>) => {
    setIsOpen(...props)
    setIsOpenComplete(false)
    setIsCloseComplete(false)
  }, [])

  const toggleOpen = useCallback(() => {
    handleSetIsOpen(prev => !prev)
  }, [handleSetIsOpen])

  return {
    isOpen,
    setIsOpen: handleSetIsOpen,
    isOpenComplete,
    setIsOpenComplete,
    isCloseComplete,
    setIsCloseComplete,
    toggleOpen
  }
}
