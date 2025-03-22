'use client'

import { useTranslations } from 'next-intl'
import { useMemo, FC } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

type Props = {
  limit: number
  setLimit: (limit: number) => void
  page: number
  pageSize: number
  pathname?: string
  isShowPageSize?: boolean
  isLink?: boolean
  onClick?: (pageNumber: number, limit?: number) => void
  className?: string
}

const RANGE = 2

const AutoPagination: FC<Props> = ({
  limit,
  setLimit,
  page,
  pageSize,
  pathname = '/',
  isShowPageSize = false,
  isLink = true,
  onClick = () => {},
  className,
}) => {
  const t = useTranslations('CORE')
  const isMobile = useIsMobile()

  const paginationItems = useMemo(() => {
    let dotBefore = false
    let dotAfter = false

    return Array.from({ length: pageSize }, (_, index) => {
      const pageNumber = index + 1

      if (
        page <= RANGE * 2 + 1 &&
        pageNumber > page + RANGE &&
        pageNumber < pageSize - RANGE + 1
      ) {
        if (!dotAfter) {
          dotAfter = true
          return <PaginationEllipsis key="after" title={t('more_pages')} />
        }
        return null
      } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
        if (pageNumber < page - RANGE && pageNumber > RANGE) {
          if (!dotBefore) {
            dotBefore = true
            return <PaginationEllipsis key="before" title={t('more_pages')} />
          }
          return null
        } else if (
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          if (!dotAfter) {
            dotAfter = true
            return <PaginationEllipsis key="after" title={t('more_pages')} />
          }
          return null
        }
      } else if (
        page >= pageSize - RANGE * 2 &&
        pageNumber > RANGE &&
        pageNumber < page - RANGE
      ) {
        if (!dotBefore) {
          dotBefore = true
          return <PaginationEllipsis key="before" title={t('more_pages')} />
        }
        return null
      }

      return (
        <PaginationItem key={pageNumber}>
          {isLink ? (
            <PaginationLink
              href={{ pathname, query: { page: pageNumber } }}
              isActive={pageNumber === page}
              className={cn({
                'bg-primary/35': pageNumber === page,
              })}
            >
              {pageNumber}
            </PaginationLink>
          ) : (
            <Button
              onClick={() => onClick(pageNumber)}
              variant={pageNumber === page ? 'outline' : 'ghost'}
              className="size-9 p-0"
            >
              {pageNumber}
            </Button>
          )}
        </PaginationItem>
      )
    })
  }, [page, pageSize, pathname, isLink, onClick, t])

  return (
    <div className="flex items-center justify-center gap-2">
      <Pagination>
        <PaginationContent className={className}>
          <PaginationItem>
            {isLink ? (
              <PaginationPrevious
                href={{ pathname, query: { page: page - 1 } }}
                className={cn({ 'cursor-not-allowed': page === 1 })}
                onClick={(e) => {
                  if (page === 1) {
                    e.preventDefault()
                    e.nativeEvent.stopImmediatePropagation()
                  }
                }}
                title={!isMobile ? t('previous') : ''}
              />
            ) : (
              <Button
                disabled={page === 1}
                className="h-9 p-0 px-2"
                variant="ghost"
                onClick={() => onClick(page - 1)}
              >
                <ChevronLeft className="size-5" /> {!isMobile && t('previous')}
              </Button>
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationContent>{paginationItems}</PaginationContent>
          </PaginationItem>
          <PaginationItem>
            {isLink ? (
              <PaginationNext
                href={{ pathname, query: { page: page + 1 } }}
                className={cn({ 'cursor-not-allowed': page === pageSize })}
                onClick={(e) => {
                  if (page === pageSize) {
                    e.preventDefault()
                    e.nativeEvent.stopImmediatePropagation()
                  }
                }}
                title={!isMobile ? t('next') : ''}
              />
            ) : (
              <Button
                disabled={page === pageSize}
                className="h-9 p-0 px-2"
                variant="ghost"
                onClick={() => onClick(page + 1)}
              >
                {!isMobile && t('next')} <ChevronRight className="size-5" />
              </Button>
            )}
          </PaginationItem>
          {!isMobile && isShowPageSize && (
            <Select
              value={limit.toString()}
              onValueChange={(value) => {
                onClick(page, Number(value))
                setLimit(Number(value))
              }}
            >
              <SelectTrigger className="w-fit cursor-pointer">
                <SelectValue placeholder={limit.toString()} />
              </SelectTrigger>
              <SelectContent className="min-w-0">
                <SelectGroup>
                  {[12, 24, 36, 48].map((item) => (
                    <SelectItem
                      key={item}
                      className="cursor-pointer"
                      value={item.toString()}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default AutoPagination
