import { Link, useParams } from 'react-router-dom'

import { ForgotPasswordEmail } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'
import { routes } from '@/router'

import s from './checkEmail.module.scss'

type Props = {}
export const CheckEmail = ({}: Props) => {
  const { email = '' } = useParams()

  return (
    <Card className={s.cardForgotPassword}>
      <Typography as={'h1'} variant={'h1'}>
        Check Email
      </Typography>

      <ForgotPasswordEmail className={s.iconEmail} />

      <div className={s.message}>
        <Typography as={'p'} variant={'body2'}>
          We’ve sent an Email with instructions to <br />
          {email}
        </Typography>
      </div>
      <Button
        as={Link}
        className={s.linkForgotPassword}
        to={routes.public.signIn}
        variant={'primary'}
      >
        Back to Sign In
      </Button>
    </Card>
  )
}
