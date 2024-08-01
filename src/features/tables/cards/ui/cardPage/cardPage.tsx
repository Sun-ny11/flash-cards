import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/components'
import { Loading } from '@/assets/components/Loading'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledRadioGroup } from '@/components/ui/controlled/controlledRadioGroup'
import { useGetRandomCardQuery, useSaveCardGradeMutation } from '@/services/cards/cardsApi'
import { useGetDeckQuery } from '@/services/decks/decksApi'

import s from './cardPage.module.scss'

type RadioGroupType = {
  grade: string
}

const rateItems = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export const CardPage = () => {
  const { deckId } = useParams()

  const [answerIsShown, setAnswerIsShown] = useState(false)
  const { data: deckData, isLoading: deckDataIsLoading } = useGetDeckQuery(deckId || '')
  const { data: randomCardData, isLoading: randomCardIsLoading } = useGetRandomCardQuery({
    id: deckId || '',
  })
  const [saveCardGrade, { isLoading: saveCardGradeIsLoading }] = useSaveCardGradeMutation()

  const { control, handleSubmit } = useForm<RadioGroupType>({
    defaultValues: {
      grade: '1',
    },
  })
  const onSubmit = handleSubmit(data => {
    if (!randomCardData) {
      return
    }
    saveCardGrade({
      cardId: randomCardData.id,
      deckId: deckId ?? '',
      grade: parseInt(data.grade, 10),
    })
  })

  useEffect(() => {
    setAnswerIsShown(false)
  }, [randomCardData])

  if (deckDataIsLoading || randomCardIsLoading) {
    return <Loading />
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
        <div className={s.imageContainer}>
          {randomCardData?.questionImg && (
            <img alt={'question image'} src={randomCardData?.questionImg} />
          )}
        </div>
        <div className={s.questionContainer}>
          <Typography as={'div'} variant={'subtitle1'}>
            Question:
          </Typography>
          <Typography as={'div'} variant={'body1'}>
            {randomCardData?.question}
          </Typography>
        </div>
        <Typography as={'p'} className={s.shots} variant={'body2'}>
          Количество попыток ответов на вопрос: {randomCardData?.shots}
        </Typography>
        {!answerIsShown && (
          <Button fullWidth onClick={() => setAnswerIsShown(true)} variant={'primary'}>
            Show Answer
          </Button>
        )}
        {answerIsShown && (
          <>
            <div className={s.imageContainer}>
              {randomCardData?.answerImg && (
                <img alt={'question image'} src={randomCardData?.answerImg} />
              )}
            </div>
            <div className={s.answerContainer}>
              <Typography as={'div'} variant={'subtitle1'}>
                Answer:
              </Typography>
              <Typography as={'div'} variant={'body1'}>
                {randomCardData?.answer}
              </Typography>
            </div>
            <Typography className={s.rate} variant={'subtitle1'}>
              Rate yourself:
            </Typography>
            <form onSubmit={onSubmit}>
              <ControlledRadioGroup
                className={s.radio}
                control={control}
                items={rateItems}
                name={'grade'}
              ></ControlledRadioGroup>
              <Button
                disabled={saveCardGradeIsLoading}
                fullWidth
                onClick={() => {}}
                variant={'primary'}
              >
                Next Question
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  )
}
