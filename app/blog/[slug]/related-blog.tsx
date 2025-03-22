import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { PostType } from '@/lib/constants'
import { generateSlugUrl } from '@/lib/utils'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

const RelatedBlog: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  const t = useTranslations()

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id} className="md:basis-1/3">
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default RelatedBlog
