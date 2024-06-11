import { Table } from '@/components/ui/table'
import { cardTableName } from '@/features/tables/tableHeaderName'

import { CardsRow } from '../cardsRow/cardsRow'
export type CardItem = {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: string
  userId: string
}

type Props = {
  isMy: boolean
  items: CardItem[]
}
export const CardsList = ({ isMy, items }: Props) => {
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
