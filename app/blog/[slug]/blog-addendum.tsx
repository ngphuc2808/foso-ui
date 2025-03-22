import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { TableOfContents } from '@app/blog/[slug]/blog-detail'

const BlogAddendum: React.FC<{
  activeSection: string
  tableOfContents: TableOfContents[]
}> = ({ activeSection, tableOfContents }) => {
  const t = useTranslations()

  return (
    <>
      <div>
        <h3 className="mb-4 font-semibold">
          {t('BlogPage.detail.table_of_contents')}
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-emerald-600 ${
                activeSection === item.id ? 'text-emerald-600' : 'text-gray-600'
              } ${item.level > 2 ? 'ml-4' : ''}`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
      <div className="space-y-4">
        <div className="relative flex h-[500px] items-center justify-between p-8 md:p-12">
          <Button
            size="lg"
            variant="outline"
            className="absolute bottom-10 left-1/2 z-10 w-11/12 -translate-x-1/2 justify-between rounded-full bg-transparent text-white"
          >
            {t('BlogPage.detail.try_now')}
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
            {t('BlogPage.detail.try_now')}
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

export default BlogAddendum
