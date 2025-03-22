import type { MetadataRoute } from 'next'

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: '',
    changeFrequency: 'daily',
    priority: 1,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...staticRoutes]
}
