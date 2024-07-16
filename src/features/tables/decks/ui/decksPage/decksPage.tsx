import { useEffect, useState } from 'react'

import { Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { useDecksSearchParams } from '@/features/tables/decks/lib/useDecksSearchParams'
import DecksFilter from '@/features/tables/decks/ui/decksPage/decksFilter/decksFilter'
import { DecksList } from '@/features/tables/decks/ui/decksPage/decksList/decksList'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decksApi'

import s from './decksPage.module.scss'

import { AddNewDeck } from './addNewDeck/addNewDeck'

const DecksPage = () => {
  const [sortingStatus, setSortingStatus] = useState<null | string>()
  const { data } = useMeQuery()
  const [currentTab, setCurrentTab] = useState<string>('all')
  const authorId = currentTab === 'my' ? data?.id : undefined
  const { data: minMaxCardsData, isLoading: minMaxCardsDataIsLoading } = useGetMinMaxCardsQuery()
  const [cardsRange, setCardsRange] = useState<number[]>([0, 10])

  const { currentPage, pageSize, searchValue, setCurrentPage, setPageSize, setSearchValue } =
    useDecksSearchParams()

  const { data: decksData, isLoading: decksAreLoading } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: cardsRange[1],
    minCardsCount: cardsRange[0],
    name: searchValue,
    orderBy: sortingStatus,
  })

  const handleTabChange = (tab: string) => {
    setCurrentPage(1)
    setCurrentTab(tab)
  }

  const resetAllFilters = () => {
    if (minMaxCardsData) {
      setCardsRange([minMaxCardsData.min, minMaxCardsData.max])
    }
    setSearchValue('')
    handleTabChange('all')
  }

  useEffect(() => {
    if (minMaxCardsData) {
      setCardsRange([minMaxCardsData.min, minMaxCardsData.max])
    }
  }, [minMaxCardsData])

  useEffect(() => {
    setCurrentPage(1)
    setPageSize(10)
  }, [searchValue, currentTab, cardsRange])

  if (minMaxCardsDataIsLoading || decksAreLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <div className={s.container}>
        <Typography as={'h1'} variant={'h1'}>
          Decks list
        </Typography>
        <AddNewDeck />
      </div>
      <DecksFilter
        cardsRange={cardsRange}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        maxRange={minMaxCardsData?.max || 0}
        minRange={minMaxCardsData?.min || 0}
        resetAllFilters={resetAllFilters}
        searchValue={searchValue}
        setCardsRange={setCardsRange}
        setSearchValue={setSearchValue}
      />
      <DecksList items={decksData?.items} sortingStatus={setSortingStatus} />
      {decksData && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={decksData.pagination?.totalItems}
        />
      )}
    </>
  )
}

export default DecksPage
