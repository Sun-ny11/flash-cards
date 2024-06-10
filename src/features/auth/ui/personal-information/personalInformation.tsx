import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, LogOut } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { FileUploader } from '@/components/ui/fileUploader'
import { UserProps } from '@/features/header/ui/user-dropdown/user-dropdown'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personalInformation.module.scss'

import defaultAvatar from './../../../../assets/images/defaultAvatar.webp'

const changeNameSchema = z.object({
  name: z.string(),
})

type FormValues = z.infer<typeof changeNameSchema>

export const PersonalInformation = ({ avatar, email, name }: UserProps) => {
  const [show, setShow] = useState(true)

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(changeNameSchema),
  })

  const onSubmit = handleSubmit(data => {
    setShow(true)
    console.log('Запрос на смену имени ' + '' + data.name)
  })

  const editNameHandler = () => {
    setShow(false)
  }

  const logoutHandler = () => {
    console.log('Запрос на логаут')
  }

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData()

      formData.append('avatar', e.target.files[0])
      // отправить на сервер formData
    }
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Personal Information
      </Typography>

      <div className={s.wrapper}>
        <div className={s.avatar}>
          <img alt={avatar.alt} src={avatar.src || defaultAvatar} />
          {show && (
            <FileUploader accept={'image/*'} onChange={changeImageHandler}>
              <Edit2Outline />
            </FileUploader>
          )}
        </div>

        {show ? (
          <div className={s.information}>
            <Typography as={'h2'} className={s.name} variant={'h2'}>
              {name}
              <Button onClick={editNameHandler}>
                <Edit2Outline />
              </Button>
            </Typography>
            <Typography as={'p'} className={s.email} variant={'body2'}>
              {email}
            </Typography>

            <Button onClick={logoutHandler} variant={'secondary'}>
              <LogOut />
              Logout
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className={s.changeName}>
              <ControlledTextField control={control} label={'Nickname'} name={'name'} />
              <Button fullWidth onClick={onSubmit}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  )
}
