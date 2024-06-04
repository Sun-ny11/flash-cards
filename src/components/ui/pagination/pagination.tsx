import { DOTS, usePagination } from '@/components/ui/pagination/hooks/usePagination'

import s from './pagination.module.scss'
import clsx from 'clsx'
import { ArrowIosBack, ArrowIosForward } from '@/assets/components'
import { Typography } from '@/components/ui'
import { Select, SelectItem } from '@/components/ui/select'

type Props = {
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  siblingCount?: number // колличество отображаемых эллементов между точек с каждой стороны от выбранной страницы
  totalCount: number
  className?: string
}
export const Pagination = (props: Props) => {
  const { currentPage, onPageChange, pageSize, siblingCount = 1, totalCount, ...rest } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
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

  let lastPage = paginationRange![paginationRange!.length - 1]

  return (
    <div className={s.wrapContainer}>
      <ul className={clsx(s.paginationContainer)}>
        {/* Left navigation arrow */}
        <li
          className={clsx(s.paginationItem, {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <ArrowIosBack />
        </li>
        {paginationRange?.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={i} className={clsx(s.paginationItem, s.dots)}>
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li
              className={clsx(s.paginationItem, pageNumber === currentPage && s.selected)}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className={clsx(s.paginationItem, {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <ArrowIosForward />
        </li>
      </ul>
      <Typography as={'div'} variant={'body2'} className={s.selectContainer}>
        Показать
        <Select defaultValue={'10'} {...rest} pagination>
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
