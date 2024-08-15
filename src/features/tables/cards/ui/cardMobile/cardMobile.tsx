import { Typography } from '@/components/ui/typography/typography'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'
import { Card } from '@/services/cards/cards.types'

import s from './cardMobile.module.scss'

import { AddNewCard } from '../addNewCard/addNewCard'
import { Rating } from '../rating'

type Props = {
  className?: string
  isMy: boolean
  items: Card[] | undefined
}

export const CardsMobile = ({ className, isMy, items }: Props) => {
  return (
    <div className={className}>
      {items?.map(card => {
        return (
          <div className={s.wrapper} key={card.id}>
            <div className={s.cardWrapper}>
              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Question
                <Typography variant={'body2'}>{card.question}</Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Answer
                <Typography variant={'body2'}>{card.answer}</Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Last Update
                <Typography variant={'body2'}>
                  {new Date(card.updated).toLocaleDateString('ru-RU')}
                </Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Grade
                <div>
                  <Rating rating={card.grade} />
                </div>
              </Typography>
            </div>
            {isMy ? (
              <div className={s.buttonsWrapper}>
                <AddNewCard
                  card={card}
                  className={s.button}
                  deckId={card.id}
                  fullWidth
                  isMy
                  variant={'primary'}
                />
                <DeleteCell
                  className={s.button}
                  deleteThat={'card'}
                  fullWidth
                  isDisabled={false}
                  onDeleteCallback={() => {}}
                  variant={'primary'}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        )
      })}
    </div>
  )
}
