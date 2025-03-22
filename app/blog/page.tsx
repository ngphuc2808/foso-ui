import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import BlogContent from '@app/blog/components/blog-content'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import images from '@app/assets/images'
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

const BlogPage = async () => {
  const t = await getTranslations('BlogPage')
  const brandT = await getTranslations('Brand')

  return (
    <>
      <div className="relative container mx-auto px-4 py-8">
        <div className="absolute top-1/2 left-0 hidden -translate-y-1/2 lg:block">
          <Image
            src={images.calendar}
            alt={t('heading.latest_news')}
            width={182}
            height={168}
            loading="lazy"
          />
        </div>
        <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block">
          <Image
            src={images.handWritting}
            alt={t('heading.latest_news')}
            width={220}
            height={151}
            loading="lazy"
          />
        </div>
        <div className="mb-8 flex justify-center text-sm text-gray-500">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{t('breadcrumb.home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  {t('breadcrumb.resources')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{t('breadcrumb.blog')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl">
            <span className="font-thin">{t('heading.blog')}</span>{' '}
            <span className="text-primary font-extrabold">
              {brandT('shortTitle')}
            </span>{' '}
            <span className="font-thin">-</span>
          </h1>
          <h2 className="mb-4 flex items-center justify-center gap-2 text-4xl">
            <span className="font-thin">{t('heading.latest_news')}</span>{' '}
            <div className="relative">
              <span className="font-extrabold">{t('heading.latest')}</span>
              <div className="bg-primary/35 absolute bottom-0 left-1/2 h-4 w-full -translate-x-1/2 rounded-full" />
            </div>
          </h2>
          <p className="text-gray-600">{t('heading.description')}</p>
        </div>
      </div>
      <BlogContent />
    </>
  )
}

export default BlogPage
