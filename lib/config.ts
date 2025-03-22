import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
})

const configObject = configSchema.safeParse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
})

if (!configObject.success) {
  console.log(configObject.error.errors)
  throw new Error('Invalid config')
}

export const envConfig = configObject.data

export type Locale = (typeof locales)[number]

export const locales = ['en', 'vi'] as const
export const defaultLocale: Locale = 'vi'

export const siteConfig = {
  name: 'FOSO',
  description: 'FOSO Software Development Company',
}
