import { Table } from '@/components/ui/table'

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
export type Card = {
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
  items: Card[]
  pagination: Pagination
}

type Props = {
  items: Card[]
}
export const DecksList = ({ items }: Props) => {
  if (items.length === 0) {
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
      <Table.Body>
        {items.map(el => (
          <DecksRow card={el} key={el.id} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}
