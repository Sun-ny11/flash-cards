import { Typography } from '@/components/ui'
import { Table } from '@/components/ui/table'

import s from './cardsRow.module.scss'

import { DeleteCell } from '../../../deleteCell/deleteCell'
import { AddNewCard } from '../addNewCard/addNewCard'
import { CardItem } from '../cardsList/cardsList'
import { Rating } from '../rating'
type Props = {
  card: CardItem
  isMy: boolean
}
export const CardsRow = ({ card, isMy }: Props) => {
  const onDeleteCallbackHandler = () => {
    // удалить по ID
  }

  return (
    <Table.Row>
      <Table.Cell>
        <div className={s.wrapper}>
          {card.questionImg ? (
            <img alt={'questionImg'} className={s.cardImg} src={card.questionImg} />
          ) : (
            ''
          )}
          <Typography as={'h3'}>{card.question}</Typography>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className={s.wrapper}>
          {card.answerImg ? (
            <img alt={'answerImg'} className={s.cardImg} src={card.answerImg} />
          ) : (
            ''
          )}
          <Typography as={'h3'}>{card.answer}</Typography>
        </div>
      </Table.Cell>
      <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
      <Table.Cell className={s.rating}>{<Rating rating={card.grade} />}</Table.Cell>
      {isMy ? (
        <Table.Cell className={s.controls}>
          <AddNewCard card={card} isMy />
          <DeleteCell deleteThat={'card'} onDeleteCallback={onDeleteCallbackHandler} />
        </Table.Cell>
      ) : (
        ''
      )}
    </Table.Row>
  )
}
