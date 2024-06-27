import { useState } from 'react'

import { Button, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import DecksFilter from '@/features/tables/decks/ui/decksPage/decksFilter/decksFilter'
import { DecksList } from '@/features/tables/decks/ui/decksPage/decksList/decksList'
import { useGetDecksQuery } from '@/services/flashCardsApi'

import s from './decksPage.module.scss'

const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [currentTab, setCurrentTab] = useState<string>('all')
  const authorId = currentTab === 'my' ? 'c8a7805b-8d56-467d-9bd1-9380ea8cf583' : undefined

  const { data, isLoading } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage: pageSize,
  })

  const handleTabChange = (tab: string) => {
    setCurrentPage(1)
    setCurrentTab(tab)
  }

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
      <DecksFilter currentTab={currentTab} handleTabChange={handleTabChange} />
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
