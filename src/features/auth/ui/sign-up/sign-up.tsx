import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { routes } from '@/router'
import { useSignUpMutation } from '@/services/auth/authApi'
import { SignUpArgs } from '@/services/auth/authTypes'
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
  const [signUp, { isLoading }] = useSignUpMutation()
  const navigate = useNavigate()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const handleSignUp = async (data: SignUpArgs) => {
    try {
      await signUp(data).unwrap()
      navigate(routes.public.signIn)
    } catch (error: any) {
      setError('email', {
        message: error.data.errorMessages[0],
        type: 'manual',
      })
    }
  }

  return (
    <Card className={s.signIn}>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Sign Up
        </Typography>
        <div className={s.formInput}>
          <ControlledTextField
            control={control}
            error={errors.email?.message}
            label={'Email'}
            name={'email'}
          />
        </div>
        <div className={s.formInput}>
          <ControlledTextField
            control={control}
            error={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
        </div>
        <div className={s.formInput}>
          <ControlledTextField
            control={control}
            error={errors.confirmPassword?.message}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>
        <Button className={s.submitBtn} disabled={isLoading} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography className={s.subtitle} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button as={Link} className={s.link} to={routes.public.signIn} variant={'link'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
