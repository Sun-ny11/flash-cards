import { ForgotPasswordEmail } from '@/assets/components'
import { Button, Card, Typography } from '@/components/ui'

import s from './forgotPassword.module.scss'

type Props = {
  email: string
}
export const ForgotPassword = ({ email }: Props) => {
  return (
    <Card className={s.cardForgotPassword}>
      <Typography as={'h1'} variant={'h1'}>
        Check Email
      </Typography>
      <div>
        <ForgotPasswordEmail className={s.iconEmail} />
      </div>
      <div className={s.message}>
        <Typography as={'p'} variant={'body2'}>
          We’ve sent an Email with instructions to <br />
          {email}
        </Typography>
      </div>
      <Button as={'a'} className={s.linkForgotPassword} href={'#'} variant={'primary'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
