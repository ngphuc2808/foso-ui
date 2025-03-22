import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { baseOpenGraph } from '@/shared-metadata'

export async function generateMetadata() {
  const t = await getTranslations('Brand')

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('shortTitle'),
    },
    description: t('description'),
    openGraph: {
      ...baseOpenGraph,
    },
  }
}

const RootPage = async () => {
  const t = await getTranslations('HomePage')

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Card className="gap-2 p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{t('welcome')}</h1>
        <h3 className="mb-2 text-xl font-semibold">{t('description')}</h3>
        <Button
          asChild
          className="m-auto flex items-center justify-center gap-2"
        >
          <Link href="/blog">
            {t('explore_blog')}
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </Card>
    </div>
  )
}

export default RootPage
