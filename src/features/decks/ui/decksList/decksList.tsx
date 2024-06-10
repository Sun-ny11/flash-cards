import { Table } from '@/components/ui/table'
import { Deck } from '@/services/decks/decks.types'

import { DecksRow } from '../decksRow/decksRow'

type Props = {
  items: Deck[] | undefined
}
export const DecksList = ({ items }: Props) => {
  if (items?.length === 0) {
    return <Table.Empty>Вы кто такие? Здесь колод нет. Идите ....</Table.Empty>
  }

  //TODO: Реализовать сортировку

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cards</Table.HeaderCell>
          <Table.HeaderCell>Last Updated</Table.HeaderCell>
          <Table.HeaderCell>Created by</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>{items?.map(el => <DecksRow card={el} key={el.id} />)}</Table.Body>
    </Table.Root>
  )
}
