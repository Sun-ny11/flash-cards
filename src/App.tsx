import { useGetDecksQuery } from '@/services/flashCardsApi'

import { DecksList } from './features/decks/ui/decksList/decksList'

export function App() {
  const { data, isLoading } = useGetDecksQuery()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={'container'}>
      <DecksList items={data?.items} />
    </div>
  )
}
