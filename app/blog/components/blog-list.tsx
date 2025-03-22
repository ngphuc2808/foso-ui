'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { PostType } from '@/lib/constants'
import { generateSlugUrl } from '@/lib/utils'

const BlogList: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  const t = useTranslations()

  return (
    <div className="space-y-8">
      <div className="relative flex min-h-28 items-center justify-between p-8 md:p-12">
        <div className="z-10 max-w-xl">
          <h2 className="mb-6 text-2xl font-bold text-white md:text-4xl">
            {t('BlogPage.community.title')}
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="justify-between rounded-full bg-transparent text-white"
          >
            {t('CORE.join_now')}
            <ArrowUpRight size={20} />
          </Button>
        </div>
        <div className="absolute inset-0 z-0">
          <Image
            src={`https://picsum.photos/505/475?random=${Math.floor(Math.random() * 100)}`}
            alt="FMRP Community"
            width={505}
            height={475}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            href={`/blog/${generateSlugUrl({ name: post.title, id: post.id })}`}
            key={post.id}
            className="group"
          >
            <div className="relative aspect-square">
              <Image
                src={post.image}
                alt={post.title}
                width={505}
                height={475}
                className="size-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col py-6">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                  {post.category}
                </span>
              </div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                {post.title}
              </h3>
              <div className="mt-auto flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-gray-500 transition-colors group-hover:text-blue-600">
                  {t('BlogPage.detail.explore_more')}
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList
