'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import SwitchLanguage from '@app/components/atoms/switch-language'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const t = useTranslations()

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full bg-gray-50 lg:px-4 lg:py-6">
      <header className="header-shadow mx-auto hidden h-16 max-w-[calc(100%-2rem)] items-center justify-center gap-12 rounded-full bg-white/80 p-4 backdrop-blur-md md:max-w-[calc(100%-4rem)] lg:flex lg:max-w-7xl">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/primary-logo.png"
            alt={t('Brand.shortTitle')}
            width={100}
            height={100}
            loading="lazy"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="#"
            className="text-gray-700 transition-colors hover:text-emerald-600"
          >
            {t('Header.about_us')}
          </Link>
          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-emerald-600">
              <span>{t('Header.solutions')}</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-emerald-600">
              <span>{t('Header.resources')}</span>
              <ChevronDown size={16} />
            </button>
            <div className="after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:text-emerald-500 after:content-['•']" />
          </div>

          <Link
            href="#"
            className="text-gray-700 transition-colors hover:text-emerald-600"
          >
            {t('Header.contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full bg-gray-100 px-3 py-1 lg:flex">
            <SwitchLanguage />
          </div>
          <Link
            href="#"
            className="hidden h-11 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600 lg:flex"
          >
            <span>{t('Header.become_customer')}</span>
            <span className="hidden size-6 items-center justify-center rounded-full bg-black xl:flex">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </header>
      <header className="flex items-center justify-between p-4 shadow-md lg:hidden">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/primary-logo.png"
            alt={t('Brand.shortTitle')}
            width={100}
            height={100}
            loading="lazy"
          />
        </Link>
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild aria-label="menu">
            <Menu size={28} className="cursor-pointer lg:hidden" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('Header.menu')}</DrawerTitle>
              <DrawerClose />
            </DrawerHeader>
            <div className="flex flex-col gap-4 p-4">
              <Link
                href="#"
                className="text-gray-700 transition-colors hover:text-emerald-600"
              >
                {t('Header.about_us')}
              </Link>
              <div className="flex flex-col gap-2">
                <button className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-emerald-600">
                  <span>{t('Header.solutions')}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex cursor-pointer items-center gap-2 text-gray-700 transition-colors hover:text-emerald-600">
                  <span>{t('Header.resources')}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <Link
                href="#"
                className="text-gray-700 transition-colors hover:text-emerald-600"
              >
                {t('Header.contact')}
              </Link>
              <div className="flex w-fit items-center rounded-full bg-gray-100 px-3 py-1">
                <SwitchLanguage />
              </div>
              <Link
                href="#"
                className="flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600"
              >
                <span>{t('Header.become_customer')}</span>
                <span className="flex size-6 items-center justify-center rounded-full bg-black">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </header>
    </div>
  )
}

export default MainHeader
