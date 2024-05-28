import { ComponentPropsWithoutRef, FocusEvent, useState } from 'react'

import { Cross } from '@/assets/icons/Cross'
import { Eye } from '@/assets/icons/Eye'
import { Search } from '@/assets/icons/Search'
import clsx from 'clsx'

import s from './input.module.scss'

import { Typography } from '../typography'

export type Props = {
  error?: string
  label?: string
  onClickClear?: () => void
  type?: 'password' | 'search' | 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = ({
  error,
  label,
  onClickClear,
  type = 'text',
  value,
  ...restProps
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const changeShowPasswordHandler = () => {
    setShowPassword(!showPassword)
  }
  const isShow = showPassword ? 'text' : 'password'

  const focusHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    // Устанавливает каретку в конец текста
    const length = event.target.value.length

    event.target.setSelectionRange(length, length)
  }

  const classes = {
    button: clsx(s.button, restProps.disabled && s.disabled),
    input: clsx(
      s.input,
      error && s.error,
      restProps.disabled && s.disabled,
      type === 'search' && s.search
    ),
    label: clsx(s.label, restProps.disabled && s.disabled),
    searchIcon: clsx(s.searchIcon, restProps.disabled && s.disabled),
  }

  return (
    <Typography as={'label'} className={classes.label} variant={'body2'}>
      {label}
      <div className={s.wrapper}>
        {type === 'search' && (
          <>
            <Search className={classes.searchIcon} />
            <button className={classes.button} disabled={restProps.disabled} onClick={onClickClear}>
              <Cross />
            </button>
          </>
        )}

        {type === 'password' && (
          <button
            className={classes.button}
            disabled={restProps.disabled}
            onClick={changeShowPasswordHandler}
          >
            <Eye view={showPassword ? 'eyeOff' : 'eyeOn'} />
          </button>
        )}

        <input
          {...restProps}
          className={classes.input}
          onFocus={focusHandler}
          type={type === 'password' ? isShow : type}
          value={value}
          {...restProps}
        />
        {error && <div className={s.errorText}>{error}</div>}
      </div>
    </Typography>
  )
}
