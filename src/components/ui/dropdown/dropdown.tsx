import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown.module.scss'

type Props = {
  children?: ReactNode
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const DropDown = ({ children, trigger, ...rest }: Props) => (
  // root - корневой элемент, всё содержимое дропдауна должно быть внути него, на нем можно поменять логику открытия окна дропдауна
  // trigger - элемент, который отвечает за вид элеменита, при клике на который происходит открытие/закрытие дропдауна
  // portal - элемент, при использовании которого, его содержимое переносится в body, вместо того, чтобы быть вложенным внутри тега root и того что над ним
  // content - содержимое выпадающего окна
  // arrow - стрелочка, которая показывает от окна выпадающего окна(content) на trigger
  <DropdownMenu.Root {...rest}>
    <DropdownMenu.Trigger className={s.trigger}>{trigger}</DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className={s.dropdownContent} sideOffset={5}>
        {children}
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
)
