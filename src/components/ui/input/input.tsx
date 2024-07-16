import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  MouseEvent,
  forwardRef,
  useState,
} from 'react'

import { Close, Eye, EyeOff, Search } from '@/assets/components'
import clsx from 'clsx'

import s from './input.module.scss'

import { Typography } from '../typography'

export type InputProps = {
  className?: string
  error?: string
  label?: string
  onClickClear?: () => void
  onValueChange?: (value: string) => void
  type?: 'password' | 'search' | 'text'
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      label,
      onChange,
      onClickClear,
      onValueChange,
      type = 'text',
      value,
      ...restProps
    }: InputProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const changeShowPasswordHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault() // отменит отправку формы
      setShowPassword(!showPassword)
    }
    const isShow = showPassword ? 'text' : 'password'

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const focusHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
      // Устанавливает каретку в конец текста
      const length = event.target.value.length

      event.target.setSelectionRange(length, length)
    }

    const classes = {
      button: clsx(s.button, restProps.disabled && s.disabled),
      input: clsx(
        className,
        s.input,
        error && s.error,
        restProps.disabled && s.disabled,
        type === 'search' && s.search
      ),
      label: clsx(s.label, restProps.disabled && s.disabled),
      searchIcon: clsx(s.searchIcon, restProps.disabled && s.disabled),
      wrapper: clsx(s.wrapper, error && s.wrapperError),
    }

    return (
      <Typography as={'label'} className={classes.label} variant={'body2'}>
        {label}

        <div className={classes.wrapper}>
          <input
            className={classes.input}
            onChange={handleChange}
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

          {error && (
            <Typography className={s.errorText} variant={'body2'}>
              {error}
            </Typography>
          )}
        </div>
      </Typography>
    )
  }
)
