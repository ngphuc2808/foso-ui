'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const Notfound = () => {
  const router = useRouter()

  const t = useTranslations()

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="gap-2 p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">404</h1>
        <h3 className="mb-2 text-xl font-semibold">
          {t('NotFoundPage.title')}
        </h3>
        <p className="mb-4 text-gray-500">{t('NotFoundPage.description')}</p>
        <Button
          onClick={() => router.push('/')}
          className="m-auto flex items-center justify-center gap-2"
        >
          <ArrowLeft className="size-5" />
          {t('CORE.back')}
        </Button>
      </Card>
    </div>
  )
}

export default Notfound
