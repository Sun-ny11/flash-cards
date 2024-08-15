import { Table } from '@/components/ui/table'
import { CardsRow } from '@/features/tables/cards/ui/cardsList/cardsRow/cardsRow'
import { TableHeader } from '@/features/tables/tableHeader/tableHeader'
import { cardTableName } from '@/features/tables/tableHeaderName'
import { Card } from '@/services/cards/cards.types'

type Props = {
  className: string
  isMy: boolean
  items: Card[] | undefined
  sortingStatus: (status: null | string) => void
}
export const CardsList = ({ className, isMy, items, sortingStatus }: Props) => {
  if (!items) {
    return <Table.Empty>There is no any cards</Table.Empty>
  }

  const filteredCardTableName = isMy ? cardTableName : cardTableName.filter(el => el.flag !== false)

  return (
    <Table.Root className={className}>
      <TableHeader item={filteredCardTableName} sortingStatus={sortingStatus} />

      <Table.Body>
        {items.map(el => (
          <CardsRow card={el} isMy={isMy} key={el.id} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}
