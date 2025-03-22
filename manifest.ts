import { MetadataRoute } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = await getLocale()

  const t = await getTranslations({
    namespace: 'Brand',
    locale,
  })

  return {
    name: t('title'),
    short_name: t('shortTitle'),
    start_url: '/',
    theme_color: '#E3262C',
  }
}
