import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { BLOG_CATEGORIES } from '@/lib/constants'

const BlogCategories = () => {
  const t = useTranslations()

  return (
    <>
      <div>
        <h3 className="mb-4 font-semibold">{t('BlogPage.categories.title')}</h3>
        <ul className="space-y-3">
          {BLOG_CATEGORIES.map((category) => (
            <li
              key={category.name}
              className="group flex items-center justify-between border-b border-gray-200 pb-2"
            >
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-emerald-500"
              >
                {category.name}
              </Link>
              <span className="text-sm text-gray-400">{category.count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="relative flex h-[500px] items-center justify-between p-8 md:p-12">
          <Button
            size="lg"
            variant="outline"
            className="absolute bottom-10 left-1/2 z-10 w-11/12 -translate-x-1/2 justify-between rounded-full bg-transparent text-white"
          >
            {t('CORE.try_now')}
            <ArrowUpRight size={20} />
          </Button>
          <div className="absolute inset-0 z-0 h-full">
            <Image
              src={`https://picsum.photos/505/475?random=${Math.floor(Math.random() * 100)}`}
              alt="FMRP Community"
              width={505}
              height={475}
              className="z-0 h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative flex h-[500px] items-center justify-between p-8 md:p-12">
          <Button
            size="lg"
            variant="outline"
            className="absolute bottom-10 left-1/2 z-10 w-11/12 -translate-x-1/2 justify-between rounded-full bg-transparent text-white"
          >
            {t('CORE.try_now')}
            <ArrowUpRight size={20} />
          </Button>
          <div className="absolute inset-0 z-0 h-full">
            <Image
              src={`https://picsum.photos/505/475?random=${Math.floor(Math.random() * 100)}`}
              alt="FMRP Community"
              width={505}
              height={475}
              className="z-0 h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogCategories
