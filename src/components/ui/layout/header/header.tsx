import { Logo } from '@/assets/icons/Logo'
import { Button, Typography } from '@/components/ui'
import { UserDropdown } from '@/features/header/ui/user-dropdown/user-dropdown'

import s from './header.module.scss'

type Props = {
  avatar?: {
    alt: string
    src: string
  }
  email: string
  isAuth: boolean
  logout: () => void
  name: string
}

export const Header = (props: Props) => {
  const { avatar, email, isAuth, logout, name } = props

  return (
    <header className={s.header}>
      <a href={'/'}>
        <Logo />
      </a>
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
    </header>
  )
}
