import { ComponentPropsWithoutRef } from 'react'

import { Check } from '@/assets/icons/svgChecbox'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ checked, id, label, onCheckedChange, ...restProps }: CheckboxProps) => {
  return (
    <div className={s.container}>
      <CheckboxRadix.Root
        checked={checked}
        className={s.CheckboxRoot}
        id={id}
        onCheckedChange={onCheckedChange}
        {...restProps}
      >
        <CheckboxRadix.Indicator className={s.checkboxIndicator}>
          <Check />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <Typography as={'label'} className={s.label} htmlFor={id} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}
