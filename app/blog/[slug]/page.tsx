import { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import BlogNotFound from '../components/blog-not-found'
import BlogDetail from './blog-detail'
import { getPostBySlug } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { baseOpenGraph } from '@/shared-metadata'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  console.log(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: `${post.title} - ${siteConfig.name}`,
    openGraph: {
      ...baseOpenGraph,
    },
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const t = await getTranslations('BlogPage')
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return <BlogNotFound />
  }

  return (
    <>
      <Breadcrumb className="mb-6">
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
      <BlogDetail post={post} />
    </>
  )
}

export default BlogPostPage
