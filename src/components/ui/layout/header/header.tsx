import { Link } from 'react-router-dom'

import { Logo } from '@/assets/icons/Logo'
import { Button, Typography } from '@/components/ui'
import { UserDropdown } from '@/features/header/ui/user-dropdown/user-dropdown'
import clsx from 'clsx'

import s from './header.module.scss'

type Props = {
  avatar?: {
    alt: string | undefined
    src: string | undefined
  }
  email: string | undefined
  isAuth: boolean
  logout: () => void
  name: string | undefined
}

export const Header = (props: Props) => {
  const { avatar, email, isAuth, logout, name } = props

  return (
    <header className={s.header}>
      <div className={clsx('container', s.wrapper)}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {isAuth && (
          <div className={s.nameAuthor}>
            <Typography>{name}</Typography>
            <UserDropdown avatar={avatar} email={name} logout={logout} name={email} />
          </div>
        )}
        {!isAuth && (
          <Button as={'button'} variant={'secondary'}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  )
}
