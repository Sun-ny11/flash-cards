import { Table } from '@/components/ui/table'
import { deckTableName } from '@/features/tables/tableHeaderName'

import { DecksRow } from '../decksRow/decksRow'

export type Author = {
  id: string
  name: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
// Тип для карточки
export type DeckItem = {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
// Тип для ответа от сервера
export type Response = {
  items: DeckItem[]
  pagination: Pagination
}

type Props = {
  isMy: boolean
  items: DeckItem[]
}
export const DecksList = ({ isMy, items }: Props) => {
  if (items.length === 0) {
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
