import { useNavigate } from 'react-router-dom'

import { LogOutOutline, PersonOutline } from '@/assets/components'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'
import { useLogoutMutation } from '@/services/auth/authApi'

import s from './user-dropdown.module.scss'

export type UserProps = {
  avatar?: {
    alt: string | undefined
    src: string | undefined
  }
  email: string | undefined
  name: string | undefined
}

export const UserDropdown = ({ avatar, email, name }: UserProps) => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <DropDown trigger={<img alt={avatar?.alt} src={avatar?.src} />}>
        <DropDownItem className={s.dropdownItem}>
          <img alt={avatar?.alt} src={avatar?.src} />
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
        <DropDownItem asChild className={s.dropdownItem}>
          <a href={'https://google.com'}>
            <PersonOutline />
            <Typography as={'div'} variant={'caption'}>
              My Profile
            </Typography>
          </a>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem className={s.dropdownItem} onSelect={onLogout}>
          <LogOutOutline />
          <Typography as={'div'} variant={'caption'}>
            Sign Out
          </Typography>
        </DropDownItem>
      </DropDown>
    </>
  )
}
