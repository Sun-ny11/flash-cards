import { Table } from '@/components/ui/table'
import { deckTableName } from '@/features/tables/tableHeaderName'
import { Deck } from '@/services/decks/decks.types'

import { DecksRow } from '../decksRow/decksRow'

type Props = {
  isMy: boolean
  items: Deck[] | undefined
}
export const DecksList = ({ isMy, items }: Props) => {
  if (!items) {
    return <Table.Empty>Вы кто такие? Здесь колод нет. Идите ....</Table.Empty>
  }

  //TODO: Реализовать сортировку

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {deckTableName.map(el => (
            <Table.HeaderCell key={el.key}>{el.title}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map(el => (
          <DecksRow deck={el} isMy={isMy} key={el.id} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}
