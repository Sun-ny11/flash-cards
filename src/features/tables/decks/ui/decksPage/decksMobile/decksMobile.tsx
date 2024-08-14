import { NavLink } from 'react-router-dom'

import PlayCircleOutline from '@/assets/components/PlayCircleOutline'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography/typography'
import { DeleteCell } from '@/features/tables/deleteCell/deleteCell'
import { Deck } from '@/services/decks/decks.types'

import s from './decksMobile.module.scss'

import { HandleDeckComponent } from '../HandleDeckComponent/HandleDeckComponent'

type Props = {
  items: Deck[] | undefined
}

export const DecksMobile = ({ items }: Props) => {
  const isMy = true

  return (
    <>
      {items?.map(el => (
        <div className={s.wrapper} key={el.id}>
          <div className={s.cardWrapper}>
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
          </div>

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
      ))}
    </>
  )
}
