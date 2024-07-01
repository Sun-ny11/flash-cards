import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets/components'
import { Button, ControlledCheckbox } from '@/components/ui'
import { ControlledFileUploader } from '@/components/ui/controlled/controlled-fileUploader/controlled-fileUploader'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Modal } from '@/components/ui/modal'
import { useCreateDeckMutation, useUpdateDeckMutation } from '@/services/flashCardsApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './addNewDeck.module.scss'

const newDeckSchema = z.object({
  cover: z.any(),
  isPrivate: z.boolean().default(false),
  name: z.string().min(1, 'This field is required'),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = {
  deckId?: string
  defaultValues?: FormValues
  isEditMode?: boolean
}

export const AddNewDeck = ({
  deckId,
  defaultValues = { cover: '', isPrivate: false, name: '' },
  isEditMode,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [createDeck, { isLoading: createDeckIsLoading }] = useCreateDeckMutation()
  const [updateDeck, { isLoading: updateDeckIsLoading }] = useUpdateDeckMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(newDeckSchema),
    shouldUnregister: true,
  })
  const onSubmit = handleSubmit(data => {
    setOpen(false)
    if (isEditMode && deckId) {
      const updateData = { id: deckId, ...data }

      updateDeck(updateData)
    } else {
      createDeck(data)
    }
  })

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <>
      {isEditMode ? (
        <Edit2Outline className={s.edit} onClick={() => setOpen(true)} />
      ) : (
        <Button onClick={() => setOpen(true)}>Add new deck</Button>
      )}
      <Modal
        onOpenChange={() => setOpen(false)}
        open={open}
        title={isEditMode ? 'Update deck' : 'Add New Deck'}
      >
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
              {isEditMode ? (
                <Button disabled={updateDeckIsLoading}>Update deck</Button>
              ) : (
                <Button disabled={createDeckIsLoading}>Add New Pack</Button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
