import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledFileUploader } from '@/components/ui/controlled/controlled-fileUploader'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Modal } from '@/components/ui/modal'
import { Card as CardType } from '@/services/cards/cards.types'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services/cards/cardsApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewCard.module.scss'

type Props = {
  card?: CardType
  deckId: string | undefined
  isMy?: boolean
}
export const AddNewCard = ({ card, deckId, isMy }: Props) => {
  const [open, setOpen] = useState(false)
  const [createCard, { isLoading }] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const newCardSchema = z.object({
    answer: z.string().min(3, 'This field is required'),
    answerImg: z.any(),
    question: z.string().min(3, 'This field is required'),
    questionImg: z.any(),
  })

  type FormValues = z.infer<typeof newCardSchema>
  // type DataToSend = {
  //   [key: string]: any
  // } & FormValues

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      answer: card?.answer || '',
      answerImg: '',
      question: card?.question || '',
      questionImg: '',
    },
    resolver: zodResolver(newCardSchema),
    shouldUnregister: true,
  })

  const onSubmit = handleSubmit((data: FormValues) => {
    setOpen(false)

    if (deckId) {
      const dataToSend = {
        id: deckId,
        ...data,
      }

      console.log('dataToSend', dataToSend)

      if (isMy) {
        updateCard(dataToSend).then(res => {
          reset({
            answer: res.data?.answer,
            answerImg: res.data?.answerImg,
            question: res.data?.question,
            questionImg: res.data?.questionImg,
          })
        })
      } else {
        createCard(dataToSend)
      }
    }
  })

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault
    setOpen(false)
  }

  const nameTitle = isMy ? 'Update Card' : 'Add New Card'

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={isMy ? 'withSVG' : 'primary'}>
        {isMy ? <Edit2Outline /> : 'Add New Card'}
      </Button>

      <Modal onOpenChange={() => setOpen(false)} open={open} title={nameTitle}>
        <Card className={s.card}>
          <form onSubmit={onSubmit}>
            <Typography as={'h2'} className={s.subtitle} variant={'subtitle2'}>
              Question:
            </Typography>

            <ControlledTextField
              className={s.input}
              control={control}
              error={errors.question?.message}
              label={'Question?'}
              name={'question'}
            />
            <ControlledFileUploader
              accept={'image/*'}
              className={s.image}
              control={control}
              imgFromCard={card?.questionImg}
              name={'questionImg'}
            >
              <ImageOutline /> Upload Image
            </ControlledFileUploader>
            <div className={s.answer}>
              <Typography as={'h2'} className={s.subtitle} variant={'subtitle2'}>
                Answer:
              </Typography>

              <ControlledTextField
                className={s.input}
                control={control}
                error={errors.answer?.message}
                label={'Question?'}
                name={'answer'}
              />
              <ControlledFileUploader
                accept={'image/*'}
                className={s.image}
                control={control}
                imgFromCard={card?.answerImg}
                name={'answerImg'}
              >
                <ImageOutline /> Upload Image
              </ControlledFileUploader>
            </div>
            <div className={s.button}>
              <Button onClick={cancelHandler} variant={'secondary'}>
                Cancel
              </Button>
              <Button disabled={isLoading}>{nameTitle}</Button>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  )
}
