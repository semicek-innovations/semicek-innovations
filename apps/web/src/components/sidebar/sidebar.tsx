'use client'

import { SlotsToClasses, tv } from '@heroui/react'
import { useRef } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { useMediaQuery } from '@/hooks/use-media-query'
import { handleClickOutside } from '@/lib/element'

import { SidebarContext, useSidebarStates } from './context'
import { SidebarBody } from './sidebar-body'
import { SidebarFooter } from './sidebar-footer'
import { SidebarHeader } from './sidebar-header'

const sidebar = tv({
  slots: {
    base: 'group flex min-h-[100dvh]',
    wrapper: 'w-[60px] text-primary transition-width lg:group-data-[open=true]:w-[min(280px,_23%)]',
    sidebar:
      'fixed left-0 z-30 flex h-[100dvh] w-[60px] select-none flex-col rounded-br-large bg-background/60 backdrop-blur-lg backdrop-saturate-150 transition-width group-data-[open=true]:w-[min(280px,_calc(100%_-_10px))] lg:group-data-[open=true]:w-[min(280px,_23%)]',
    content:
      'flex w-[calc(100vw_-_60px)] grow flex-col transition-width lg:group-data-[open=true]:w-[max(calc(100vw_-_280px),_77%)]'
  }
})

interface SidebarProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'content'> {
  content: React.ReactNode
  classNames?: SlotsToClasses<keyof ReturnType<typeof sidebar>>
}

export function Sidebar({ children, content, className, classNames, ...props }: SidebarProps) {
  const classes = sidebar()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { matches } = useMediaQuery({ size: 'lg' })
  const { isOpen, isOpenComplete, isCloseComplete, setIsOpen, toggleOpen, setIsOpenComplete, setIsCloseComplete } =
    useSidebarStates()

  const isMounted = useIsMounted(() => {
    if (isOpen) {
      setIsOpen(!matches)
    }
  }, [matches])

  function onClickOutside() {
    if (isOpen && matches) setIsOpen(false)
  }

  function onTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName === 'width') {
      setIsOpenComplete(isOpen)
      setIsCloseComplete(!isOpen)
    }
  }

  if (!isMounted) return null
  return (
    <SidebarContext.Provider value={{ isOpen, isOpenComplete, isCloseComplete, toggleOpen }}>
      <div
        data-open={isOpen}
        data-open-complete={isOpenComplete}
        data-close-complete={isCloseComplete}
        className={classes.base({ class: [className, classNames?.base] })}
        {...props}
      >
        <div className={classes.wrapper({ class: classNames?.wrapper })} onTransitionEnd={onTransitionEnd}>
          <div ref={sidebarRef} className={classes.sidebar({ class: classNames?.sidebar })}>
            {children}
          </div>
        </div>
        <div
          className={classes.content({ class: classNames?.content })}
          onClick={handleClickOutside(sidebarRef, onClickOutside)}
        >
          {content}
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

Sidebar.Header = SidebarHeader
Sidebar.Body = SidebarBody
Sidebar.Footer = SidebarFooter
