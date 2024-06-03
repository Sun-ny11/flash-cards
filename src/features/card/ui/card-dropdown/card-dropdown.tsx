import {
  Edit2Outline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/components'
import { DropDown, DropDownItem, DropDownSeparator } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'

import s from './card-dropdown.module.scss'

export const CardDropdown = () => {
  return (
    <>
      <DropDown trigger={<MoreVerticalOutline />}>
        <DropDownItem className={s.dropdownItem}>
          <PlayCircleOutline />
          <Typography as={'div'} variant={'caption'}>
            Learn
          </Typography>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem className={s.dropdownItem}>
          <Edit2Outline />
          <Typography as={'div'} variant={'caption'}>
            Edit
          </Typography>
        </DropDownItem>
        <DropDownSeparator></DropDownSeparator>
        <DropDownItem className={s.dropdownItem}>
          <TrashOutline />
          <Typography as={'div'} variant={'caption'}>
            Delete
          </Typography>
        </DropDownItem>
      </DropDown>
    </>
  )
}
