import { Logo } from '@/assets/icons/Logo'
import { Button, Typography } from '@/components/ui'
import { UserDropdown } from '@/features/header/ui/user-dropdown/user-dropdown'

import s from './header.module.scss'

export type ProfileData = {
  avatar?: string
  email: string
  name: string
}

export type HeaderProps = {
  isAuth: boolean
  logout: () => void
  profile?: ProfileData
}

export const Header = (props: HeaderProps) => {
  const { isAuth, logout, profile } = props

  return (
    <header className={s.header}>
      <a href={'/'}>
        <Logo />
      </a>
      {isAuth && profile?.email && profile.name && logout && (
        <div className={s.nameAuthor}>
          <Typography>{profile?.name}</Typography>
          <UserDropdown logout={logout} profile={profile} />
        </div>
      )}
      {!isAuth && (
        <Button as={'a'} href={'/login'} variant={'secondary'}>
          Sign in
        </Button>
      )}
    </header>
  )
}
