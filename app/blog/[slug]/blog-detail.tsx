'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import DOMPurify from 'dompurify'
import { useTranslations } from 'next-intl'

import { BLOG_POSTS, PostType } from '@/lib/constants'
import { useHasMounted } from '@/hooks/use-has-mounted'
import BlogAddendum from '@app/blog/[slug]/blog-addendum'
import RelatedBlog from '@app/blog/[slug]/related-blog'
import images from '@/app/assets/images'

export type TableOfContents = {
  id: string
  title: string
  level: number
}

const BlogDetailContent: React.FC<{
  post: PostType
  hideShare?: boolean
}> = ({ post, hideShare = false }) => {
  const hasMounted = useHasMounted()
  const t = useTranslations()

  const [tableOfContents, setTableOfContents] = useState<TableOfContents[]>([])
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!post) return

    const contentDiv = document.createElement('div')
    contentDiv.innerHTML = post.content
    const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')

    const toc: TableOfContents[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))
    setTableOfContents(toc)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    document
      .querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
      .forEach((heading) => {
        observer.observe(heading)
      })

    return () => observer.disconnect()
  }, [post])

  if (!hasMounted) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
              {post.category}
            </span>
          </div>
          <article className="prose prose-lg max-w-none">
            <div className="mb-4 flex flex-col gap-4 text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/primary-logo.png"
                  alt="FOSO"
                  width={48}
                  height={48}
                  className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
                />
                <div>
                  <p className="text-xs sm:text-sm">
                    {t('BlogPage.detail.author')}
                  </p>
                  <p className="text-sm font-medium sm:text-base">
                    FOSO Creator
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:gap-8 sm:text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="sm:h-4 sm:w-4" />
                  <span>
                    {t('BlogPage.detail.updated_at')}: {post.date}
                  </span>
                </div>
                <span className="hidden sm:inline">|</span>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="sm:h-4 sm:w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
            <div className="my-8 rounded-2xl border border-gray-200 bg-white/80 p-4 sm:p-6">
              <h3 className="mb-4 text-center text-lg font-semibold sm:text-xl">
                {t('BlogPage.detail.feedback.title')}
              </h3>
              <p className="mb-6 text-center text-sm text-gray-600 sm:text-base">
                4 {t('BlogPage.detail.feedback.responses')}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border-2 border-emerald-500 p-2 sm:p-3">
                    <Image
                      src={images.thumbsUp}
                      alt={t('BlogPage.detail.feedback.useful')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    1
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.useful')}
                  </span>
                </button>
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border border-gray-200 p-2 sm:p-3">
                    <Image
                      src={images.greenHeart}
                      alt={t('BlogPage.detail.feedback.love')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    2
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.love')}
                  </span>
                </button>
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border border-gray-200 p-2 sm:p-3">
                    <Image
                      src={images.starStruck}
                      alt={t('BlogPage.detail.feedback.interesting')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    0
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.interesting')}
                  </span>
                </button>
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border border-gray-200 p-2 sm:p-3">
                    <Image
                      src={images.hushedFace}
                      alt={t('BlogPage.detail.feedback.surprised')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    1
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.surprised')}
                  </span>
                </button>
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border border-gray-200 p-2 sm:p-3">
                    <Image
                      src={images.yawningFace}
                      alt={t('BlogPage.detail.feedback.boring')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    0
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.boring')}
                  </span>
                </button>
                <button className="flex cursor-pointer flex-col items-center gap-1 sm:gap-2">
                  <div className="rounded-lg border border-gray-200 p-2 sm:p-3">
                    <Image
                      src={images.poutingFace}
                      alt={t('BlogPage.detail.feedback.angry')}
                      width={32}
                      height={32}
                      className="h-6 w-6 sm:h-10 sm:w-10"
                    />
                  </div>
                  <span className="text-center text-sm font-medium sm:text-base">
                    0
                  </span>
                  <span className="text-center text-xs text-gray-600 sm:text-sm">
                    {t('BlogPage.detail.feedback.angry')}
                  </span>
                </button>
              </div>
            </div>
          </article>
          <div className="my-8 xl:hidden">
            <h3 className="mb-4 text-sm font-semibold">
              {t('BlogPage.detail.share')}
            </h3>
            <div className="flex flex-row flex-wrap gap-3">
              <button className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border p-2 transition-colors hover:border-emerald-500 hover:text-emerald-500">
                <Image src={images.zalo} alt="Zalo" width={20} height={20} />
              </button>
              <button className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border p-2 transition-colors hover:border-emerald-500 hover:text-emerald-500">
                <Image
                  src={images.facebook}
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </button>
              <button className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border p-2 transition-colors hover:border-emerald-500 hover:text-emerald-500">
                <Image src={images.x} alt="X" width={20} height={20} />
              </button>
              <button className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border p-2 transition-colors hover:border-emerald-500 hover:text-emerald-500">
                <Image
                  src={images.linkedin}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </button>
              <button className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border p-2 transition-colors hover:border-emerald-500 hover:text-emerald-500">
                <Image
                  src={images.reddit}
                  alt="Reddit"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 space-y-8 lg:order-2">
          <div className="sticky top-24 space-y-8">
            <BlogAddendum
              activeSection={activeSection}
              tableOfContents={tableOfContents}
            />
          </div>
        </div>
      </div>
      {!hideShare && (
        <div className="fixed top-36 left-4 hidden xl:block">
          <h3 className="mb-4 text-sm font-semibold">
            {t('BlogPage.detail.share')}
          </h3>
          <div className="flex flex-col gap-4">
            <button className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border p-3 transition-colors hover:border-emerald-500 hover:text-emerald-500">
              <Image src={images.zalo} alt="Zalo" width={24} height={24} />
            </button>
            <button className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border p-3 transition-colors hover:border-emerald-500 hover:text-emerald-500">
              <Image
                src={images.facebook}
                alt="Facebook"
                width={24}
                height={24}
              />
            </button>
            <button className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border p-3 transition-colors hover:border-emerald-500 hover:text-emerald-500">
              <Image src={images.x} alt="X" width={24} height={24} />
            </button>
            <button className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border p-3 transition-colors hover:border-emerald-500 hover:text-emerald-500">
              <Image
                src={images.linkedin}
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </button>
            <button className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border p-3 transition-colors hover:border-emerald-500 hover:text-emerald-500">
              <Image src={images.reddit} alt="Reddit" width={24} height={24} />
            </button>
          </div>
        </div>
      )}
      <h2 className="mb-6 text-2xl font-semibold">
        {t('BlogPage.detail.related_posts')}
      </h2>
      <RelatedBlog posts={BLOG_POSTS} />
    </>
  )
}

export default BlogDetailContent
