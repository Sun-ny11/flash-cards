import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signup.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card className={s.signIn}>
      <form onSubmit={onSubmit}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Sign Up
        </Typography>
        <ControlledTextField
          control={control}
          error={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <ControlledTextField
          control={control}
          error={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledTextField
          control={control}
          error={errors.confirmPassword?.message}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
        />
        <Button className={s.submitBtn} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography className={s.subtitle} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button as={'a'} className={s.signUp} href={'/'} variant={'link'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
