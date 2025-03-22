import { envConfig } from '@/lib/config'

export const baseOpenGraph = {
  locale: 'en_US',
  alternateLocale: ['vi_VN'],
  type: 'website',
  siteName: 'FOSOSoft',
  images: [
    {
      url: 'https://fososoft.vn/wp-content/uploads/2024/02/FOSO_Logo_Final_1-1400x579.png',
    },
  ],
}

export const idJsonObject = {
  '@context': 'https://schema.org',
  '@type': 'Software',
  name: 'FOSOSoft',
  image: {
    '@type': 'ImageObject',
    url: 'https://fososoft.vn/wp-content/uploads/2024/02/FOSO_Logo_Final_1-1400x579.png',
    width: 1400,
    height: 579,
  },
  telephone: '0901136968',
  url: `${envConfig.NEXT_PUBLIC_URL}/`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Binh Thanh District, Ho Chi Minh City',
    addressLocality: 'Ho Chi Minh',
    postalCode: '700000',
    addressRegion: 'Ho Chi Minh',
    addressCountry: 'VN',
  },
  priceRange: '1000 - 1000000000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:00',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '10.803043',
    longitude: '106.715305',
  },
}
