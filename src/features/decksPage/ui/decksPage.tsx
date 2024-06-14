import { Button, Typography } from '@/components/ui'
import { DecksList } from '@/features/decks/ui/decksList/decksList'
import { useGetDecksQuery } from '@/services/flashCardsApi'

import s from './decksPage.module.scss'

const DecksPage = () => {
  const { data, isLoading } = useGetDecksQuery()

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
      <DecksList items={data?.items} />
    </>
  )
}

export default DecksPage
