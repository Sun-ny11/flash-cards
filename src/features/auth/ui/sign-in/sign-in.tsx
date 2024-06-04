import { useForm } from 'react-hook-form'

import { Button, Card, ControlledCheckbox, Input, Typography } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signin.module.scss'

const signInSchema = z.object({
  email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof signInSchema>

export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card className={s.signIn}>
      <form onSubmit={onSubmit}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Sign In
        </Typography>
        <Input {...register('email')} error={errors.email?.message} label={'Email'} />
        <Input
          {...register('password')}
          error={errors.password?.message}
          label={'Password'}
          type={'password'}
        />
        <div className={s.checkoxContainer}>
          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        </div>
        <Button as={'a'} className={s.forgotPassword} href={'/'} variant={'link'}>
          Forgot password
        </Button>
        <Button className={s.submitBtn} fullWidth type={'submit'}>
          Sign in
        </Button>
        <Typography className={s.subtitle} variant={'body2'}>
          Don't have an account?
        </Typography>
        <Button as={'a'} className={s.signUp} href={'/'} variant={'link'}>
          Sign Up
        </Button>
      </form>
    </Card>
  )
}
