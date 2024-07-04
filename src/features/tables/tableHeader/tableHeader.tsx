import { useState } from 'react'

import ArrowIosUp from '@/assets/components/ArrowIosUp'
import { Table } from '@/components/ui/table/table'
import clsx from 'clsx'

import s from './tableHeader.module.scss'

type tableName = {
  flag?: boolean
  key: string
  title: string
}

type Props = {
  item: tableName[]
  sortingStatus: (status: null | string) => void
}

export const TableHeader = ({ item, sortingStatus }: Props) => {
  const [sort, setSort] = useState<null | string>('asc')
  const [name, setName] = useState<string>()

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
    <Table.Head>
      <Table.Row>
        {item.map(el => (
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
  )
}
