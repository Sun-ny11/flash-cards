import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupUI from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

import { Typography } from '../typography/typography'

type Options = {
  label: string
  value: string
}
type Props = {
  items: Options[]
  onValueChange: (value: string) => void
} & ComponentPropsWithoutRef<typeof RadioGroupUI.Root>

export const RadioGroup = ({ items, onValueChange, ...restProps }: Props) => {
  return (
    <>
      <RadioGroupUI.Root className={s.root} onValueChange={onValueChange} {...restProps}>
        {items.map(el => (
          <Typography
            as={'label'}
            className={clsx(s.label, restProps.disabled && s.disabled)}
            key={el.value}
            variant={'body2'}
          >
            <RadioGroupUI.Item className={s.item} disabled={restProps.disabled} value={el.value}>
              <RadioGroupUI.Indicator className={s.indicator} />
            </RadioGroupUI.Item>
            {el.label}
          </Typography>
        ))}
      </RadioGroupUI.Root>
    </>
  )
}
