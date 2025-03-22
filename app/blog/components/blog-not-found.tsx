'use client'

import { useTranslations } from 'next-intl'

const BlogNotFound = () => {
  const t = useTranslations()

  return <div>{t('Brand.not_found')}</div>
}

export default BlogNotFound
