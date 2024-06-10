import { LogOutOutline, PersonOutline } from '@/assets/components'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'

import s from './user-dropdown.module.scss'

export type UserProps = {
  avatar: {
    alt: string
    src: string
  }
  email: string
  name: string
}

export const UserDropdown = ({ avatar, email, name }: UserProps) => {
  return (
    <>
      <DropDown trigger={<img alt={avatar.alt} src={avatar.src} />}>
        <DropDownItem className={s.dropdownItem}>
          <img alt={avatar.alt} src={avatar.src} />
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
        <DropDownItem className={s.dropdownItem}>
          <LogOutOutline />
          <Typography as={'div'} variant={'caption'}>
            Sign Out
          </Typography>
        </DropDownItem>
      </DropDown>
    </>
  )
}
