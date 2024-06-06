import { ComponentPropsWithoutRef, FocusEvent, MouseEvent, forwardRef, useState } from 'react'

import { Close, Eye, EyeOff, Search } from '@/assets/components'
import clsx from 'clsx'

import s from './input.module.scss'

import { Typography } from '../typography'

export type InputProps = {
  error?: string
  label?: string
  onClickClear?: () => void
  type?: 'password' | 'search' | 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, onClickClear, type = 'text', value, ...restProps }: InputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const changeShowPasswordHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault() // отменит отправку формы
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
          <input
            className={classes.input}
            onFocus={focusHandler}
            ref={ref}
            type={type === 'password' ? isShow : type}
            value={value}
            {...restProps}
          />
          {type === 'search' && (
            <>
              <Search className={classes.searchIcon} />
              <button
                className={classes.button}
                disabled={restProps.disabled}
                onClick={onClickClear}
              >
                {value?.length ? <Close /> : ''}
              </button>
            </>
          )}

          {type === 'password' && (
            <button
              className={classes.button}
              disabled={restProps.disabled}
              onClick={changeShowPasswordHandler}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}

          {error && <div className={s.errorText}>{error}</div>}
        </div>
      </Typography>
    )
  }
)
