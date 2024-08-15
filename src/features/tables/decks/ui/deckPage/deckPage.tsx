import { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/components'
import { Loading } from '@/assets/components/Loading'
import defaultCard from '@/assets/images/defaultCard.webp'
import { Button, Input, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { CardDropdown } from '@/features/card/ui/card-dropdown/card-dropdown'
import { AddNewCard } from '@/features/tables/cards/ui/addNewCard/addNewCard'
import { CardsMobile } from '@/features/tables/cards/ui/cardMobile/cardMobile'
import { CardsList } from '@/features/tables/cards/ui/cardsList/cardsList'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetCardsQuery } from '@/services/cards/cardsApi'
import { useGetDeckQuery } from '@/services/decks/decksApi'

import s from './deckPage.module.scss'

export const DeckPage = () => {
  const [sortingStatus, setSortingStatus] = useState<null | string>()
  const { data: userData } = useMeQuery()
  const { deckId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState<string>('')
  const { data: deckData, isLoading: deckDataIsLoading } = useGetDeckQuery(deckId || '')
  const { data: cardsData, isLoading: cardsDataIsLoading } = useGetCardsQuery({
    currentPage,
    id: deckId || '',
    itemsPerPage: pageSize,
    orderBy: sortingStatus,
  })
  const isMyDeck = userData?.id === deckData?.userId
  let filteredCards = cardsData?.items

  console.log(filteredCards)

  useEffect(() => {
    filteredCards = cardsData?.items.filter(card => {
      return card.question.toLowerCase().includes(searchValue.toLowerCase())
    })
  }, [searchValue])

  if (deckDataIsLoading || cardsDataIsLoading) {
    return <Loading />
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
        <div className={s.cardInfoContainer}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            {deckData?.name}
          </Typography>
          {isMyDeck && deckData && <CardDropdown deck={deckData} />}
        </div>
        {isMyDeck ? (
          <AddNewCard deckId={deckId} />
        ) : (
          <Button as={Link} className={s.linkCard} to={`/decks/${deckData?.id}/learn`}>
            <Typography as={'h3'}>Learn deck</Typography>
          </Button>
        )}
      </div>
      <img alt={'deck cover'} className={s.image} src={deckData?.cover || defaultCard} />
      <div className={s.search}>
        <Input
          className={s.searchInput}
          label={'Search by question'}
          name={'search'}
          onValueChange={setSearchValue}
          placeholder={'Search card...'}
        />
      </div>
      {filteredCards ? (
        <>
          <CardsList
            className={s.cardsList}
            isMy={isMyDeck}
            items={filteredCards}
            sortingStatus={setSortingStatus}
          />
          <CardsMobile className={s.cardsMobile} isMy={isMyDeck} items={filteredCards} />
        </>
      ) : (
        <Typography>There is no cards in this deck!</Typography>
      )}
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
