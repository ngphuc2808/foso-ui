'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  search: z.string(),
})

type Props = {
  defaultValue?: string
}

const BlogSearch: React.FC<Props> = ({ defaultValue = '' }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: defaultValue,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('search', values.search)
    params.set('page', '1')

    router.push(`/blog?${params.toString()}`)
  }

  return (
    <>
      <h3 className="mb-4 font-semibold">{t('BlogPage.search.title')}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder={t('BlogPage.search.placeholder')}
                      className="h-12 w-full border-none bg-white/80 pr-14 pl-6 text-gray-600 shadow-sm outline-none placeholder:text-gray-400 focus:ring-0"
                      {...field}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-emerald-500 p-2 text-white hover:bg-emerald-600"
                      aria-label="search"
                    >
                      <Search size={20} />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}

export default BlogSearch
