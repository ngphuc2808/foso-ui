import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withNextIntl(nextConfig))
