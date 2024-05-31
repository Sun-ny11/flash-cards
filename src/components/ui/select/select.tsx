import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ChevronDown } from '@/assets/icons/iconForSelect/chevronDown'
// import { ChevronUp } from '@/assets/icons/iconForSelect/chevronUp'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = {
  className?: string
  label?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = (props: Props) => {
  const { children, disabled = false, label, ...restProps } = props

  return (
    <div className={s.selectWrapper}>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        {label}
      </Typography>

      <SelectRadix.Root defaultValue={'0'} {...restProps}>
        <SelectRadix.Trigger className={s.selectTrigger} disabled={disabled}>
          <SelectRadix.Value style={{ color: 'black' }} />
          {/*<ChevronUp />*/}
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
            <SelectRadix.Viewport style={{ background: 'inherit' }}>
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
