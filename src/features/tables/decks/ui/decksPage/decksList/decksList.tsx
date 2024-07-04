import { useState } from 'react'

import { ArrowIosUp } from '@/assets/components'
import { Table } from '@/components/ui/table'
import { DecksRow } from '@/features/tables/decks/ui/decksPage/decksList/decksRow/decksRow'
import { deckTableName } from '@/features/tables/tableHeaderName'
import { Deck } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './decksList.module.scss'

type Props = {
  isMy: boolean
  items: Deck[] | undefined
  sortingStatus: (status: null | string) => void
}
export const DecksList = ({ isMy, items, sortingStatus }: Props) => {
  const [sort, setSort] = useState<null | string>('asc')
  const [name, setName] = useState<string>()
  //Куча перерисовок из-за трех стейтов в сортировке

  if (!items) {
    return <Table.Empty>Вы кто такие? Здесь колод нет. Идите ....</Table.Empty>
  }
  console.log('ad')

  const sorting = (name: string) => {
    if (name === 'controls') {
      return
    }
    setName(name)
    if (sort === 'asc' || sort === 'desc') {
      if (sort === 'desc') {
        setSort(null)
        sortingStatus(name + '-' + 'desc')
      } else if (sort === 'asc') {
        setSort('desc')
        sortingStatus(name + '-' + 'asc')
      }
    }
    if (sort === null) {
      setSort('asc')
      sortingStatus(sort)
    }
  }

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {deckTableName.map(el => (
            <Table.HeaderCell key={el.key} onClick={() => sorting(el.key)}>
              {el.title}

              {name === el.key && sort !== 'asc' ? (
                <ArrowIosUp className={clsx(s.arrow, sort === 'desc' ? s.arrowDown : '')} />
              ) : (
                ''
              )}
            </Table.HeaderCell>
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
