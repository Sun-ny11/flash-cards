import { Edit } from '@/assets/icons/Edit'
import { Play } from '@/assets/icons/Play'
import { Trash } from '@/assets/icons/Trash'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks/decks.types'

import s from './decksRow.module.scss'

import defaultCard from '../../../../assets/images/defaultCard.webp'

type Props = {
  card: Deck
}

export const DecksRow = ({ card }: Props) => {
  const isMyCard = 'Логика сравнения userID === card.author.name'

  return (
    <Table.Row>
      <Table.Cell>
        <Button as={'a'} className={s.linkCard}>
          <img alt={'CardImage'} className={s.cardImage} src={card.cover ?? defaultCard} />
          <Typography as={'h3'}>{card.name}</Typography>
        </Button>
      </Table.Cell>
      <Table.Cell>{card.cardsCount}</Table.Cell>
      <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
      <Table.Cell>{card.author.name}</Table.Cell>
      <Table.Cell className={s.buttonCell}>
        {isMyCard ? (
          <>
            <Button as={'a'} className={s.controlBtn}>
              <Edit />
            </Button>
            <Button as={'a'} className={s.controlBtn}>
              <Play />
            </Button>
            <Button as={'a'} className={s.controlBtn}>
              <Trash />
            </Button>
          </>
        ) : (
          <Button as={'a'} className={s.controlBtn}>
            <Play />
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
