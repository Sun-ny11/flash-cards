import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'

import s from './decksRow.module.scss'

import defaultCard from '../../../../../assets/images/defaultCard.webp'
import { DeckItem } from '../decksList/decksList'

type Props = {
  deck: DeckItem
  isMy: boolean
}

export const DecksRow = ({ deck, isMy }: Props) => {
  const onDeleteCallbackHandler = () => {
    // удалить по ID
  }

  return (
    <Table.Row>
      <Table.Cell>
        <Button as={'a'} className={s.linkCard}>
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
            <DeleteCell
              deleteThat={'deck'}
              name={deck.name}
              onDeleteCallback={onDeleteCallbackHandler}
            />
          </>
        ) : (
          'тут будет learn-card'
        )}
      </Table.Cell>
    </Table.Row>
  )
}
