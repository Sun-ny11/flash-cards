import { Link, NavLink } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline } from '@/assets/components'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'
import { Deck } from '@/services/decks/decks.types'

import s from './decksRow.module.scss'

import defaultCard from '../../../../../../../assets/images/defaultCard.webp'

type Props = {
  deck: Deck
  isMy: boolean
}

export const DecksRow = ({ deck, isMy }: Props) => {
  const onDeleteCallbackHandler = () => {
    // удалить по ID
  }

  return (
    <Table.Row>
      <Table.Cell>
        <Button as={Link} className={s.linkCard} to={`/decks/${deck.id}`}>
          <img alt={'CardImage'} className={s.cardImage} src={deck.cover ?? defaultCard} />
          <Typography as={'h3'}>{deck.name}</Typography>
        </Button>
      </Table.Cell>
      <Table.Cell>{deck.cardsCount}</Table.Cell>
      <Table.Cell>{new Date(deck.updated).toLocaleDateString('ru-RU')}</Table.Cell>
      <Table.Cell>{deck.author.name}</Table.Cell>
      <Table.Cell className={s.buttonCell}>
        {isMy ? (
          <>
            <NavLink className={s.option} to={`/decks/${deck.id}/learn`}>
              <PlayCircleOutline />
            </NavLink>
            <div className={s.option}>
              <Edit2Outline className={s.option} />
            </div>
            <DeleteCell
              className={s.option}
              deleteThat={'deck'}
              name={deck.name}
              onDeleteCallback={onDeleteCallbackHandler}
            />
          </>
        ) : (
          <NavLink className={s.option} to={`/decks/${deck.id}/learn`}>
            <PlayCircleOutline />
          </NavLink>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
