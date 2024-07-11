import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ArrowBackOutline } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editProfile.module.scss'

const signInSchema = z.object({
  name: z.string({ message: 'This field is required' }),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof signInSchema>

export const EditProfile = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(signInSchema),
  })

  // const handle = async (data: LoginArgs) => {
  //   try {
  //     await login(data).unwrap()
  //     navigate('/')
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }
  const [editMode, setEditMode] = useState(true)

  return (
    <Card className={s.EditProfile}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Personal Information
      </Typography>
      {/*<EditAvatar />*/}
      {editMode ? (
        <ControlledTextField
          control={control}
          error={errors.name?.message}
          label={'New Name'}
          name={'name'}
          onBlur={() => setEditMode(prev => !prev)}
        />
      ) : (
        <Button as={'a'} className={s.logOut} href={'/'} variant={'link'}>
          <ArrowBackOutline />
          Logout
        </Button>
      )}
    </Card>
  )
}
