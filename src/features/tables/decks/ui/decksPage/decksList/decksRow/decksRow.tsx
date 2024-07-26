import { Link, NavLink } from 'react-router-dom'

import { PlayCircleOutline } from '@/assets/components'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { AddNewDeck } from '@/features/tables/decks/ui/decksPage/addNewDeck/addNewDeck'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'
import { useMeQuery } from '@/services/auth/authApi'
import { Deck } from '@/services/decks/decks.types'
import { useDeleteDeckMutation } from '@/services/decks/decksApi'
import clsx from 'clsx'

import s from './decksRow.module.scss'

import defaultCard from '../../../../../../../assets/images/defaultCard.webp'

type Props = {
  deck: Deck
}

export const DecksRow = ({ deck }: Props) => {
  const [deleteCard, { isLoading }] = useDeleteDeckMutation()
  const onDeleteCallbackHandler = () => {
    deleteCard(deck.id)
  }
  const { data } = useMeQuery()
  const isMy = data?.id === deck.userId
  const isDisabled = !deck.cardsCount

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
            <Button
              as={NavLink}
              className={clsx(isDisabled ? s.disabled : '', s.option)}
              to={`/decks/${deck.id}/learn`}
              variant={'withSVG'}
            >
              <PlayCircleOutline />
            </Button>

            <div className={s.option}>
              <AddNewDeck deckId={deck.id} defaultValues={deck} isEditMode />
            </div>
            <DeleteCell
              className={s.option}
              deleteThat={'deck'}
              isDisabled={isLoading}
              name={deck.name}
              onDeleteCallback={onDeleteCallbackHandler}
            />
          </>
        ) : (
          <Button
            as={NavLink}
            className={clsx(isDisabled && s.disabled, s.option)}
            to={`/decks/${deck.id}/learn`}
            variant={'withSVG'}
          >
            <PlayCircleOutline />
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
