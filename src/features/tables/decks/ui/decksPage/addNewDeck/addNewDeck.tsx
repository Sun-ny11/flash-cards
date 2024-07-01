import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets/components'
import { Button, ControlledCheckbox } from '@/components/ui'
import { ControlledFileUploader } from '@/components/ui/controlled/controlled-fileUploader/controlled-fileUploader'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Modal } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services/flashCardsApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewDeck.module.scss'

export const AddNewDeck = () => {
  const [open, setOpen] = useState(false)
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const newDeckSchema = z.object({
    cover: z.any(),
    isPrivate: z.boolean().default(false),
    name: z.string().min(1, 'This field is required'),
  })

  type FormValues = z.infer<typeof newDeckSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      cover: '',
      name: '',
    },
    resolver: zodResolver(newDeckSchema),
    shouldUnregister: true,
  })
  const onSubmit = handleSubmit(data => {
    setOpen(false)
    createDeck(data)
  })

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new deck</Button>
      <Modal onOpenChange={() => setOpen(false)} open={open} title={'Add New Deck'}>
        <div className={s.wrapper}>
          <form onSubmit={onSubmit}>
            <div className={s.form}>
              <ControlledTextField
                control={control}
                error={errors.name?.message}
                label={'Name Pack'}
                name={'name'}
              />
              <ControlledFileUploader accept={'image/*'} control={control} name={'cover'}>
                <ImageOutline /> Upload Image
              </ControlledFileUploader>
              <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
            </div>

            <div className={s.button}>
              <Button onClick={cancelHandler} variant={'secondary'}>
                Cancel
              </Button>
              <Button disabled={isLoading}>Add New Pack</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
