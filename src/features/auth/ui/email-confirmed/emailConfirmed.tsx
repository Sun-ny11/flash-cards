import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, Card, Typography } from '@/components/ui'
import { routes } from '@/router'
import { useConfirmEmailMutation } from '@/services/auth/authApi'

import s from './emailConfirmed.module.scss'

type Props = {}
export const EmailConfirmed = ({}: Props) => {
  const { code = '' } = useParams()
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation()

  useEffect(() => {
    confirmEmail({ code }).then(res => {
      console.log('res', res)
    })
  }, [])

  return (
    <>
      {isLoading ? (
        <Typography variant={'body1'}>...Verificating</Typography>
      ) : (
        <Card className={s.emailConfirmed}>
          <Typography as={'h1'} variant={'h1'}>
            Your email has been confirmed
          </Typography>

          <Button as={Link} to={routes.private.decks} variant={'primary'}>
            Home
          </Button>
        </Card>
      )}
    </>
  )
}
