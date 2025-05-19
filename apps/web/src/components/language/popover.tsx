'use client'

import { Avatar, Popover, PopoverContent, PopoverTrigger, ScrollShadow } from '@heroui/react'
import { SupportedLanguage } from '@semicek-innovations/i18n'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useLanguage } from '@/app/_providers/language-provider'

import { Button } from '../button'
import { languages } from './consts'

interface LanguagePopoverProps {
  className?: string
}

export function LanguagePopover({ className }: LanguagePopoverProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, multiLangText } = useLanguage()

  const handleLanguageChange = (code: SupportedLanguage) => () => {
    setLanguage(code)
    setIsOpen(false)
    router.refresh()
  }

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className={className}>
        <Avatar
          as="button"
          color="secondary"
          src={languages.find(l => l.code === language)?.avatar}
          className="h-6 w-6"
        />
      </PopoverTrigger>
      <PopoverContent className="max-h-48 space-y-2 p-2">
        <ScrollShadow className="flex flex-col" hideScrollBar>
          {languages.map(({ code, localizedNames, props }) => (
            <Button
              size="sm"
              radius="sm"
              variant="light"
              className="text-foreground"
              endContent={props.startContent}
              onPress={handleLanguageChange(code as SupportedLanguage)}
              key={code}
            >
              <span className="grow text-end">{multiLangText(localizedNames)}</span>
            </Button>
          ))}
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  )
}
