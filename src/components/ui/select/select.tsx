import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ChevronDown } from '@/assets/icons/iconForSelect/chevronDown'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = {
  className?: string
  label?: string
  pagination?: boolean
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = (props: Props) => {
  const { children, disabled, label, pagination, ...restProps } = props

  return (
    <div className={s.selectWrapper}>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        {label}
      </Typography>

      <SelectRadix.Root {...restProps}>
        <SelectRadix.Trigger
          className={clsx(s.selectTrigger, pagination && s.paginationSelect)}
          disabled={disabled}
        >
          <SelectRadix.Value />
          <SelectRadix.Icon className={s.selectIcon}>
            <ChevronDown />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content
            align={'start'}
            className={s.selectContent}
            position={'popper'}
            sideOffset={-6}
          >
            {/*<ChevronUp />*/}
            <SelectRadix.Viewport>
              <SelectRadix.Group className={s.selectGroup}>{children}</SelectRadix.Group>
              <SelectRadix.Separator />
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton />
            <SelectRadix.Arrow />
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item {...props} className={s.selectItem} ref={forwardedRef}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)
