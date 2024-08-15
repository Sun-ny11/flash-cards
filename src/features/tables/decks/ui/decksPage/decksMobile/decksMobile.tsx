import { Link, NavLink } from 'react-router-dom'

import PlayCircleOutline from '@/assets/components/PlayCircleOutline'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography/typography'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'
import { useMeQuery } from '@/services/auth/authApi'
import { Deck } from '@/services/decks/decks.types'

import s from './decksMobile.module.scss'

import { HandleDeckComponent } from '../HandleDeckComponent/HandleDeckComponent'

type Props = {
  className: string
  items: Deck[] | undefined
}

export const DecksMobile = ({ className, items }: Props) => {
  const { data } = useMeQuery()

  //
  return (
    <div className={className}>
      {items?.map(el => {
        const isMy = data?.id === el.userId

        return (
          <div className={s.wrapper} key={el.id}>
            <Link className={s.cardWrapper} to={`/decks/${el.id}`}>
              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Name
                <Typography variant={'body2'}>{el.name}</Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Cards
                <Typography variant={'body2'}>{el.cardsCount}</Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Last Update
                <Typography variant={'body2'}>
                  {new Date(el.updated).toLocaleDateString('ru-RU')}
                </Typography>
              </Typography>

              <Typography as={'div'} className={s.row} variant={'subtitle2'}>
                Created by
                <Typography variant={'body2'}> {el.author.name}</Typography>
              </Typography>
            </Link>

            <div className={s.buttonsWrapper}>
              {isMy ? (
                <>
                  <Button as={NavLink} className={s.button} fullWidth to={`/decks/${el.id}/learn`}>
                    <PlayCircleOutline />
                  </Button>
                  <HandleDeckComponent
                    className={s.button}
                    deckId={el.id}
                    defaultValues={el}
                    fullWidth
                    isEditMode
                    variant={'primary'}
                  />
                  <DeleteCell
                    className={s.button}
                    deleteThat={'deck'}
                    isDisabled={false}
                    name={el.name}
                    onDeleteCallback={() => {}}
                    variant={'primary'}
                  />
                </>
              ) : (
                <Button as={NavLink} className={s.button} fullWidth to={`/decks/${el.id}/learn`}>
                  <PlayCircleOutline />
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
