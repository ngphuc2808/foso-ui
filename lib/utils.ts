import slugify from 'slugify'
import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import { BLOG_POSTS } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSlugUrl = ({ name, id }: { name: string; id: number }) => {
  return `${slugify(name)}-i.${id}`
}

export const getIdFromSlugUrl = (slug: string) => {
  return Number(slug.split('-i.')[1])
}

export const getPostBySlug = async (slug: string) => {
  const id = getIdFromSlugUrl(slug)
  return BLOG_POSTS.find((post) => post.id === id)
}
