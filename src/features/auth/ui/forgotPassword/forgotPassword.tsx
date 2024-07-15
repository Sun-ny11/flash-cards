import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button/button'
import { Card } from '@/components/ui/card/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field'
import { Typography } from '@/components/ui/typography/typography'
import { useRecoverPasswordMutation } from '@/services/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const forgotPassword = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
})

type ForgotPasswordType = z.infer<typeof forgotPassword>

export const ForgotPassword = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPassword),
  })

  const onSubmit = handleSubmit(data => {
    recoverPassword({
      ...data,
      html: '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/create-new-password/##token##">here</a> to recover your password</p>',
      //для работы в vercel: https://flash-cards-mauve.vercel.app/create-new-password/##token##"
    })
    navigate(`/check-email/${data.email}`)
  })

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <form onSubmit={onSubmit}>
        <ControlledTextField
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.desc} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>

        <Button as={'button'} fullWidth type={'submit'} variant={'primary'}>
          Send Instructions
        </Button>

        <Typography as={'p'} className={s.subtitle} variant={'body2'}>
          Did you remember your password?
        </Typography>

        <Button as={Link} className={s.link} fullWidth to={'/login'} variant={'link'}>
          Try logging in
        </Button>
      </form>
    </Card>
  )
}
