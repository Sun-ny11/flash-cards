import { NavLink, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { useGetDeckQuery, useGetRandomCardQuery } from '@/services/flashCardsApi'

import s from './cardPage.module.scss'

export const CardPage = () => {
  const { deckId } = useParams()

  const { data: deckData, isLoading: deckDataIsLoading } = useGetDeckQuery(deckId || '')
  const { data: randomCardData, isLoading: randomCardIsLoading } = useGetRandomCardQuery({
    id: deckId || '',
  })

  if (deckDataIsLoading || randomCardIsLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className={s.wrapper}>
      <NavLink className={s.back} to={'/decks'}>
        <Typography as={'div'} className={s.back} variant={'body2'}>
          <ArrowBackOutline />
          Back to Decks List
        </Typography>
      </NavLink>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Learn {deckData?.name}
        </Typography>
        <div className={s.questionContainer}>
          <Typography as={'div'} variant={'subtitle2'}>
            Question:
          </Typography>
          <Typography as={'div'} variant={'body1'}>
            {randomCardData?.question}
          </Typography>
        </div>
        <Typography as={'p'} className={s.shots} variant={'body2'}>
          Количество попыток ответов на вопрос: {randomCardData?.shots}
        </Typography>
        <Button fullWidth variant={'primary'}>
          Show Answer
        </Button>
      </Card>
    </div>
  )
}
