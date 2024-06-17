import { NavLink, useParams } from 'react-router-dom'

import { Button, Card, Typography } from '@/components/ui'

import s from './cardPage.module.scss'

export const CardPage = () => {
  const { deckId } = useParams()

  console.log('CardPage deckId', deckId)

  return (
    <div className={s.wrapper}>
      <NavLink className={s.back} to={'/decks'}>
        <Typography as={'div'} variant={'body2'}>
          Back to Decks List
        </Typography>
      </NavLink>
      <Card className={s.card}>
        <Typography>Question</Typography>
        <Button fullWidth variant={'primary'}>
          Show Answer
        </Button>
      </Card>
    </div>
  )
}
