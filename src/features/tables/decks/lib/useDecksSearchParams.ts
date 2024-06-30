import { useSearchParams } from 'react-router-dom'

import { useQueryParam } from '@/hooks/useQueryParam/useQueryParam'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useQueryParam(
    searchParams,
    setSearchParams,
    'search',
    '' as string
  )

  const [currentPage, setCurrentPage] = useQueryParam(
    searchParams,
    setSearchParams,
    'currentPage',
    1 as number
  )
  const [pageSize, setPageSize] = useQueryParam(
    searchParams,
    setSearchParams,
    'pageSize',
    10 as number
  )

  return { currentPage, pageSize, searchValue, setCurrentPage, setPageSize, setSearchValue }
}
