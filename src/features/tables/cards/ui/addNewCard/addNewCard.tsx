import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledFileUploader } from '@/components/ui/controlled/controlled-fileUploader'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Modal } from '@/components/ui/modal'
import { useCreateCardMutation } from '@/services/flashCardsApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewCard.module.scss'

import { Card as CardItem } from '../../../../../services/decks/decks.types'

type Props = {
  card?: CardItem
  deckId: string | undefined
  isMy?: boolean
}
export const AddNewCard = ({ card, deckId, isMy }: Props) => {
  const [open, setOpen] = useState(false)
  const [createCard, { isLoading }] = useCreateCardMutation()

  const newCardSchema = z.object({
    answer: z.string().min(3, 'This field is required'),
    answerImg: z.string(),
    question: z.string().min(3, 'This field is required'),
    questionImg: z.string(),
  })

  type FormValues = z.infer<typeof newCardSchema>
  type DataToSend = {
    [key: string]: any
  } & FormValues

  const {
    control,
    formState: { errors },
    handleSubmit,
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

  const onSubmit = handleSubmit((data: DataToSend) => {
    setOpen(false)
    // удалять свойства с пустой строкой при отправке на сервер,
    // чтобы при редактировании, если не было загружено изображение,
    // старое изображение не перезаписывалось пустой строкой

    for (const key in data) {
      if (data[key] === '') {
        delete data[key]
      }
    }

    if (deckId) {
      const dataToSend = {
        id: deckId,
        ...data,
      }

      createCard(dataToSend)
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
            <Typography variant={'subtitle2'}>Question:</Typography>

            <ControlledTextField
              control={control}
              error={errors.question?.message}
              label={'Question?'}
              name={'question'}
            />
            <ControlledFileUploader
              accept={'image/*'}
              control={control}
              imgFromCard={card?.questionImg}
              name={'questionImg'}
            >
              <ImageOutline /> Upload Image
            </ControlledFileUploader>

            <Typography variant={'subtitle2'}>Answer:</Typography>

            <ControlledTextField
              control={control}
              error={errors.answer?.message}
              label={'Answer'}
              name={'answer'}
            />
            <ControlledFileUploader
              accept={'image/*'}
              control={control}
              imgFromCard={card?.answerImg}
              name={'answerImg'}
            >
              <ImageOutline /> Upload Image
            </ControlledFileUploader>
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
