import { ArrowIosBack, ArrowIosForward } from '@/assets/components'
import { Typography } from '@/components/ui'
import { DOTS, usePagination } from '@/components/ui/pagination/hooks/usePagination'
import { Select, SelectItem } from '@/components/ui/select'
import clsx from 'clsx'

import s from './pagination.module.scss'

type Props = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSize: number
  siblingCount?: number // колличество отображаемых эллементов между точек с каждой стороны от выбранной страницы
  totalCount: number
}
export const Pagination = (props: Props) => {
  const {
    className,
    currentPage,
    onPageChange,
    onPageSizeChange,
    pageSize,
    siblingCount = 1,
    totalCount,
    ...rest
  } = props

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const onPageSizeChangeHandler = (newValue: string) => {
    onPageSizeChange(parseInt(newValue))
  }

  const lastPage = paginationRange![paginationRange!.length - 1]

  return (
    <div className={clsx(s.wrapContainer, className)}>
      <button className={clsx(s.buttonLeft)} disabled={currentPage === 1} onClick={onPrevious}>
        <ArrowIosBack />
      </button>
      <div className={clsx(s.paginationContainer)}>
        {paginationRange?.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <span className={clsx(s.paginationItem, s.dots)} key={i}>
                &#8230;
              </span>
            )
          }

          // Render our Page Pills
          return (
            <Typography
              as={'button'}
              className={clsx(s.paginationItem, pageNumber === currentPage && s.selected)}
              key={i}
              onClick={() => onPageChange(+pageNumber)}
              variant={'body2'}
            >
              {pageNumber}
            </Typography>
          )
        })}
      </div>
      <button className={clsx(s.buttonRight)} disabled={currentPage === lastPage} onClick={onNext}>
        <ArrowIosForward />
      </button>

      <Typography as={'div'} className={s.selectContainer} variant={'body2'}>
        Показать
        <Select defaultValue={'10'} onValueChange={onPageSizeChangeHandler} {...rest} pagination>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'20'}>20</SelectItem>
          <SelectItem value={'30'}>30</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
        на странице
      </Typography>
    </div>
  )
}
