'use client'

import { useTranslations } from 'next-intl'

import BlogList from '@app/blog/components/blog-list'
import BlogSearch from '@app/blog/components/blog-search'
import BlogCategories from '@app/blog/components/blog-categories'
import AutoPagination from '@/app/components/molecules/auto-pagination'
import SearchParamsLoader, {
  useSearchParamsLoader,
} from '@app/components/atoms/search-params-loader'
import { useHasMounted } from '@/hooks/use-has-mounted'
import { BLOG_POSTS, PAGE_SIZE } from '@/lib/constants'

const BlogContent = () => {
  const { searchParams, setSearchParams } = useSearchParamsLoader()
  const hasMounted = useHasMounted()
  const t = useTranslations()

  const currentPage = searchParams?.get('page')
    ? Number(searchParams?.get('page'))
    : 1

  const selectedCategory =
    searchParams?.get('category') || t('BlogPage.categories.all')
  const searchQuery = searchParams?.get('search') || ''

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === t('BlogPage.categories.all') ||
      post.category === selectedCategory
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (!hasMounted) return null

  return (
    <>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <h2 className="mb-6 text-2xl font-semibold">
            {t('BlogPage.heading.latest')}
          </h2>
          <BlogList posts={filteredPosts} />
        </div>
        <div className="order-1 space-y-8 lg:order-2">
          <BlogSearch defaultValue={searchQuery} />
          <BlogCategories />
        </div>
      </div>
      <AutoPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        limit={PAGE_SIZE}
        setLimit={() => {}}
        pathname="/blog"
        className="my-8 w-full justify-between"
      />
    </>
  )
}

export default BlogContent
