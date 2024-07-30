import { Link } from 'react-router-dom'

import { LogOutOutline, PersonOutline } from '@/assets/components'
import { Button } from '@/components/ui'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { useLogout } from '@/hooks/useLogout'
import { routes } from '@/router'

import s from './user-dropdown.module.scss'

export type UserProps = {
  avatar?: string | undefined
  email: string | undefined
  isVerificated?: boolean
  name: string | undefined
}

export const UserDropdown = ({ avatar, email, name }: UserProps) => {
  const { logout } = useLogout()

  return (
    <>
      <DropDown
        trigger={
          <div className={s.trigger}>
            <Typography>{email}</Typography>
            <img alt={'avatar'} src={avatar || 'img/default-avatar.png'} />
          </div>
        }
      >
        <DropDownItem className={s.dropdownItem}>
          <img alt={'avatar'} src={avatar || 'img/default-avatar.png'} />
          <div>
            <Typography as={'div'} variant={'body2'}>
              {name}
            </Typography>
            <Typography as={'div'} variant={'caption'}>
              {email}
            </Typography>
          </div>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem className={s.dropdownItem}>
          <Button as={Link} className={s.link} to={routes.private.profile} variant={'link'}>
            <PersonOutline />
            My Profile
          </Button>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem className={s.dropdownItem} onSelect={() => logout()}>
          <LogOutOutline />
          <Typography as={'div'} variant={'caption'}>
            Sign Out
          </Typography>
        </DropDownItem>
      </DropDown>
    </>
  )
}
