import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/components'
import { Button, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { CardsList } from '@/features/tables/cards/ui/cardsList/cardsList'
import { useGetCardsQuery, useGetDeckQuery } from '@/services/flashCardsApi'

import s from './deckPage.module.scss'
export const DeckPage = () => {
  const { deckId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: deckData, isLoading: deckDataIsLoading } = useGetDeckQuery(deckId || '')
  const { data: cardsData, isLoading: cardsDataIsLoading } = useGetCardsQuery({
    currentPage,
    id: deckId || '',
    itemsPerPage: pageSize,
  })

  if (deckDataIsLoading || cardsDataIsLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={s.wrapper}>
      <NavLink className={s.back} to={'/decks'}>
        <Typography as={'div'} variant={'body2'}>
          <ArrowBackOutline />
          Back to Decks List
        </Typography>
      </NavLink>
      <div className={s.topContainer}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {deckData?.name}
        </Typography>
        <Button variant={'primary'}>Add new card</Button>
      </div>
      <img alt={'deck cover'} className={s.image} src={deckData?.cover} />
      <CardsList isMy={false} items={cardsData?.items} />
      {cardsData && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={cardsData.pagination?.totalItems}
        />
      )}
    </div>
  )
}
