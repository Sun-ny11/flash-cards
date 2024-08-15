import { Table } from '@/components/ui/table'
import { DecksRow } from '@/features/tables/decks/ui/decksPage/decksList/decksRow/decksRow'
import { TableHeader } from '@/features/tables/tableHeader/tableHeader'
import { deckTableName } from '@/features/tables/tableHeaderName'
import { Deck } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './decksList.module.scss'

type Props = {
  className?: string
  items: Deck[] | undefined
  sortingStatus: (status: null | string) => void
}

export const DecksList = ({ className, items, sortingStatus }: Props) => {
  if (!items) {
    return <Table.Empty>Вы кто такие? Здесь колод нет. Идите ....</Table.Empty>
  }

  return (
    <Table.Root className={clsx(className, s.tableRoot)}>
      <TableHeader item={deckTableName} sortingStatus={sortingStatus} />
      <Table.Body>
        {items.map(el => (
          <DecksRow deck={el} key={el.id} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}
