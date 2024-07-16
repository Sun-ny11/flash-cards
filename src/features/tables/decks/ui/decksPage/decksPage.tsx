import { useEffect, useState } from 'react'

import { Button, Typography } from '@/components/ui'
import { Pagination } from '@/components/ui/pagination'
import { useDecksSearchParams } from '@/features/tables/decks/lib/useDecksSearchParams'
import DecksFilter from '@/features/tables/decks/ui/decksPage/decksFilter/decksFilter'
import { DecksList } from '@/features/tables/decks/ui/decksPage/decksList/decksList'
import { useGetDecksQuery, useGetMinMaxCardsQuery } from '@/services/decks/decksApi'

import s from './decksPage.module.scss'

const DecksPage = () => {
  const [sortingStatus, setSortingStatus] = useState<null | string>()

  const [currentTab, setCurrentTab] = useState<string>('all')
  const authorId = currentTab === 'my' ? 'c8a7805b-8d56-467d-9bd1-9380ea8cf583' : undefined
  const { data: minMaxCardsData, isLoading: minMaxCardsDataIsLoading } = useGetMinMaxCardsQuery()
  const [cardsRange, setCardsRange] = useState<number[]>([0, 10])

  const { currentPage, pageSize, searchValue, setCurrentPage, setPageSize, setSearchValue } =
    useDecksSearchParams()
  const onSearchValueChange = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

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

  if (minMaxCardsDataIsLoading || decksAreLoading) {
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
      <DecksFilter
        cardsRange={cardsRange}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        maxRange={minMaxCardsData?.max}
        minRange={minMaxCardsData?.min}
        resetAllFilters={resetAllFilters}
        searchValue={searchValue}
        setCardsRange={setCardsRange}
        setSearchValue={onSearchValueChange}
      />
      <DecksList items={decksData?.items} sortingStatus={setSortingStatus} />
      {decksData && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage ?? 1}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize ?? 10}
          totalCount={decksData.pagination?.totalItems}
        />
      )}
    </>
  )
}

export default DecksPage
