import { Metadata } from 'next'

import Modal from '@/app/@modal/(.)blog/[slug]/modal'
import BlogDetail from '@/app/blog/[slug]/blog-detail'
import BlogNotFound from '@/app/blog/components/blog-not-found'
import { getPostBySlug } from '@/lib/utils'
import { siteConfig } from '@/lib/config'
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

const BlogModalPage: React.FC<Props> = async ({ params }) => {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return <BlogNotFound />
  }

  return (
    <Modal>
      <BlogDetail post={post} hideShare />
    </Modal>
  )
}

export default BlogModalPage
