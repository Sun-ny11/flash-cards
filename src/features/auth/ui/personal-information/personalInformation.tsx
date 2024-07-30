import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Edit2Outline, ImageOutline, LogOut, Trash } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledFileUploader } from '@/components/ui/controlled/controlled-fileUploader'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { UserProps } from '@/features/header/ui/user-dropdown/user-dropdown'
import { useLogout } from '@/hooks/useLogout'
import { routes } from '@/router'
import {
  useDeleteMeMutation,
  useResendVerificationMutation,
  useUpdateUserDataMutation,
} from '@/services/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personalInformation.module.scss'

import defaultAvatar from './../../../../assets/images/defaultAvatar.webp'

const changeUserDataSchema = z.object({
  avatar: z.any(),
  name: z.string(),
})

type FormValues = z.infer<typeof changeUserDataSchema>
export type UserWithIdProps = {
  userId: string | undefined
} & UserProps

export const PersonalInformation = ({
  avatar,
  email,
  isVerificated,
  name,
  userId,
}: UserWithIdProps) => {
  const navigate = useNavigate()
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [updateData, { isLoading }] = useUpdateUserDataMutation()
  const [resendVerification, { isLoading: isResendLoading }] = useResendVerificationMutation()
  const [deleteMe, { isLoading: isDeletingLoading }] = useDeleteMeMutation()
  const { logout } = useLogout()
  const [show, setShow] = useState(true)

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      avatar: null,
      name: '',
    },
    resolver: zodResolver(changeUserDataSchema),
  })

  const onSubmit = handleSubmit(data => {
    updateData(data).then(() => {
      setShow(true)
    })
  })

  const editNameHandler = () => {
    setShow(false)
  }

  // const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const formData = new FormData()
  //
  //     formData.append('avatar', e.target.files[0])
  //     // отправить на сервер formData
  //   }
  // }

  const avatarUpdateHandler = (data: { avatar: any }) => {
    updateData(data)
  }

  const resendVerificationHandler = async () => {
    try {
      await resendVerification({ userId })
      setIsEmailSent(true)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAccountHandler = async () => {
    try {
      await deleteMe()
      navigate(routes.public.signIn)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Personal Information
      </Typography>

      <form className={s.wrapper} onSubmit={onSubmit}>
        <div className={s.avatar}>
          {show && (
            <ControlledFileUploader
              accept={'image/*'}
              control={control}
              imgFromCard={avatar || defaultAvatar}
              mode={'profile'}
              name={'avatar'}
              onUpdate={avatarUpdateHandler}
            >
              <ImageOutline />
            </ControlledFileUploader>
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

            {isVerificated ? (
              <Typography as={'p'} className={s.email} variant={'body2'}>
                Account verificated
              </Typography>
            ) : (
              <>
                <Typography as={'p'} className={s.email} variant={'body2'}>
                  Account is not verificated
                </Typography>
                {isEmailSent ? (
                  <Typography variant={'h4'}>Email verification sent</Typography>
                ) : (
                  <Button
                    className={s.optionBtn}
                    disabled={isResendLoading}
                    onClick={resendVerificationHandler}
                    variant={'primary'}
                  >
                    Send verification link
                  </Button>
                )}
              </>
            )}

            <Button
              className={s.optionBtn}
              disabled={isDeletingLoading}
              onClick={deleteAccountHandler}
              variant={'secondary'}
            >
              <Trash />
              Delete account
            </Button>

            <Button onClick={() => logout()} variant={'secondary'}>
              <LogOut />
              Logout
            </Button>
          </div>
        ) : (
          <div className={s.changeName}>
            <ControlledTextField
              control={control}
              defaultValue={name}
              label={'Nickname'}
              name={'name'}
            />
            <Button disabled={isLoading} fullWidth onClick={onSubmit}>
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}
