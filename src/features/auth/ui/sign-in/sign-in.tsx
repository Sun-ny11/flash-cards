import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Card, ControlledCheckbox, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { routes } from '@/router'
import { useLoginMutation } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authTypes'
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
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(signInSchema),
  })

  // const { isError, isLoading } = useMeQuery()
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleSignIn = async (data: LoginArgs) => {
    try {
      await login(data).unwrap()
      navigate('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  // if (!isError && !isLoading) {
  //   return <Navigate to={'/'} />
  // }

  return (
    <Card className={s.signIn}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Sign In
        </Typography>
        <div className={s.test}>
          <Typography variant={'h4'}>Test mode credentials:</Typography>
          <Typography variant={'body1'}>Email: test@test.com</Typography>
          <Typography variant={'body1'}>Password: test</Typography>
        </div>
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
        <div className={s.checkoxContainer}>
          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        </div>
        <Typography as={Link} className={s.forgotPassword} to={'/'} variant={'link1'}>
          Forgot password
        </Typography>
        <Button className={s.submitBtn} fullWidth type={'submit'}>
          Sign in
        </Button>
        <Typography className={s.subtitle} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Typography as={Link} className={s.signUp} to={routes.public.signUp} variant={'subtitle1'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
