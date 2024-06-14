import { useState } from 'react'

import { Button, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { DecksList } from '@/features/tables/decks/ui/decksList/decksList'
import { useGetDecksQuery } from '@/services/flashCardsApi'

import s from './decksPage.module.scss'

const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data, isLoading } = useGetDecksQuery({ currentPage, itemsPerPage: pageSize })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <div className={s.container}>
        <Typography as={'h1'} variant={'h1'}>
          Decks list
        </Typography>
        <Button>Add New Deck</Button>
      </div>
      <DecksList isMy items={data?.items} />
      {data && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={data.pagination?.totalItems}
        />
      )}
    </>
  )
}

export default DecksPage
