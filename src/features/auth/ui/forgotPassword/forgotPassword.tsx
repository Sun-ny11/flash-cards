import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const forgotPasswordSchema = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
})

type FormValues = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handlerRecoverPassword = (data: FormValues) => {
    console.log(data.email)
  }

  return (
    <Card className={s.cardForgotPassword}>
      <Typography as={'h1'} variant={'h1'}>
        Forgot your password?
      </Typography>

      <form onSubmit={handleSubmit(handlerRecoverPassword)}>
        <ControlledTextField
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.description} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>

      <div className={s.bottom}>
        <Typography as={'p'} className={s.desc} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button as={'a'} className={s.logIn} href={'/login'} variant={'link'}>
          Try logging in
        </Button>
      </div>
    </Card>
  )
}
