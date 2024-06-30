import { LogOutOutline, PersonOutline } from '@/assets/components'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { ProfileData } from '@/components/ui/layout/header'
import { Typography } from '@/components/ui/typography'

import s from './user-dropdown.module.scss'

export type HeaderDropDownProps = {
  logout: () => void
  profile: ProfileData
}

export const UserDropdown = ({ logout, profile: { avatar, email, name } }: HeaderDropDownProps) => {
  return (
    <>
      <DropDown trigger={<img alt={avatar} />}>
        <DropDownItem className={s.dropdownItem}>
          <img alt={'photo'} src={avatar} />
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
        <DropDownItem className={s.dropdownItem} onSelect={logout}>
          <LogOutOutline />
          <Typography as={'div'} variant={'caption'}>
            Sign Out
          </Typography>
        </DropDownItem>
      </DropDown>
    </>
  )
}
