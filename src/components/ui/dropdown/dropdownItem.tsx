import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

type Props = {
  className?: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownItem = ({ className, ...rest }: Props) => (
  <DropdownMenu.Item className={clsx(s.item, className)} {...rest}></DropdownMenu.Item>
)
