import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType> = {
  as?: T
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export function Typography<T extends ElementType>({
  as,
  className,
  variant = 'body1',
  ...restProps
}: TypographyProps<T>) {
  const Component = as ?? 'p'

  return <Component className={`${s[variant]} ${className}`} {...restProps} />
}
