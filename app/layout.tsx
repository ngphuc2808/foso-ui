import '@app/globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import AppProvider from '@app/providers/app-provider'
import ThemeProvider from '@app/providers/theme-provider'
import GlobalScript from '@app/components/atoms/global-script'
import { baseOpenGraph } from '@/shared-metadata'

const fontBe = localFont({
  src: [
    {
      path: './fonts/BeVietnamPro-Light.ttf',
      weight: '300',
    },
    {
      path: './fonts/BeVietnamPro-Regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/BeVietnamPro-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/BeVietnamPro-SemiBold.ttf',
      weight: '600',
    },
    {
      path: './fonts/BeVietnamPro-Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-be',
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()

  const t = await getTranslations({
    locale,
    namespace: 'Brand',
  })

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    openGraph: {
      ...baseOpenGraph,
    },
    twitter: {
      ...baseOpenGraph,
    },
  }
}

const RootLayout: React.FC<
  Readonly<{
    modal: React.ReactNode
    children: React.ReactNode
  }>
> = async ({ children, modal }) => {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontBe.className} ${fontBe.variable} antialiased`}>
        <NextTopLoader showSpinner={false} color="var(--primary)" />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              {modal}
              <Toaster />
            </ThemeProvider>
          </AppProvider>
        </NextIntlClientProvider>
        <GlobalScript />
      </body>
    </html>
  )
}

export default RootLayout
