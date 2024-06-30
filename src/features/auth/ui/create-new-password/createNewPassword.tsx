import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

const createNewPasswordSchema = z.object({
  password: z.string().min(3, 'Enter your password'),
})

type CreateNewPasswordValues = z.infer<typeof createNewPasswordSchema>

type Props = {
  onSubmit: (data: CreateNewPasswordValues) => void
}
export const CreateNewPassword = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordValues>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(createNewPasswordSchema),
  })
  const onSubmitHandler = (data: CreateNewPasswordValues) => {
    onSubmit(data)
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <ControlledTextField
          // className={s.passwordForm}
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.desc} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button as={'button'} fullWidth type={'submit'} variant={'primary'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
