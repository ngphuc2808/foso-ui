'use client'

import { useLocale, useTranslations } from 'next-intl'
import { RefreshCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <div className="fixed inset-0 flex items-center justify-center">
          <Card className="gap-2 p-8 text-center shadow-md">
            <h1 className="mb-4 text-3xl font-bold">500</h1>
            <h3 className="mb-2 text-xl font-semibold">
              {t('ErrorPage.title')}
            </h3>
            <p className="text-gray-500">{t('ErrorPage.description')}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4" variant="link">
                  {t('ErrorPage.info-title')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('ErrorPage.info-title')}</DialogTitle>
                  <DialogDescription>{error.message}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button
              onClick={reset}
              className="m-auto flex items-center justify-center gap-2"
            >
              <RefreshCcw className="size-5" />
              {t('CORE.reload')}
            </Button>
          </Card>
        </div>
      </body>
    </html>
  )
}

export default Error
