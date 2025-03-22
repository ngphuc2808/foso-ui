'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { locales } from '@/lib/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { setUserLocale } from '@/lib/locale'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown } from 'lucide-react'

const SwitchLanguage = () => {
  const t = useTranslations('SwitchLanguage')
  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="locale">
        <div className="flex cursor-pointer items-center justify-center gap-2 p-1">
          <Button
            variant="outline"
            size="icon"
            className="size-7 rounded-full border-none p-0 outline-none"
          >
            <Avatar className="size-7">
              <AvatarImage src={`/${locale}.png`} alt="locale" />
              <AvatarFallback>{locale}</AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm">{locale.toUpperCase()}</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => setUserLocale(locale)}>
            <Image
              src={`/${locale}.png`}
              alt={locale}
              width={20}
              height={20}
              quality={80}
              loading="lazy"
            />
            {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SwitchLanguage
