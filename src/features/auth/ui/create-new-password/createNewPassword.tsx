import { Button, Card, Typography } from '@/components/ui'

import s from './createNewPassword.module.scss'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

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
      <Typography as={'h1'} variant={'h1'} className={s.title}>
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
        <Typography as={'p'} variant={'body2'} className={s.desc}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button as={'button'} variant={'primary'} type={'submit'} fullWidth>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
