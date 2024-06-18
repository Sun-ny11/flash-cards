import { Table } from '@/components/ui/table'
import { cardTableName } from '@/features/tables/tableHeaderName'
import { Card } from '@/services/decks/decks.types'

import { CardsRow } from '../cardsRow/cardsRow'

type Props = {
  isMy: boolean
  items: Card[] | undefined
}
export const CardsList = ({ isMy, items }: Props) => {
  if (!items) {
    return <Table.Empty>There is no any cards</Table.Empty>
  }

  const filteredCardTableName = isMy ? cardTableName : cardTableName.filter(el => el.flag !== false)

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {filteredCardTableName.map(el => (
            <Table.HeaderCell key={el.key}>{el.title}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.map(el => (
          <CardsRow card={el} isMy={isMy} key={el.id} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}
