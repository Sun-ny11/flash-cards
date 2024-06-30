import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

const Slider = forwardRef<
  ElementRef<typeof SliderRadix.Root>,
  {
    value: (number | undefined)[]
  } & Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'value'>
>(({ className, max, onValueChange, value, ...props }, ref) => {
  useEffect(() => {
    if (value?.[1] === undefined || value?.[1] === undefined) {
      onValueChange?.([value?.[0] ?? 0, max ?? 0])
    }
  }, [max, value, onValueChange])

  return (
    <div className={s.container}>
      <span className={s.valueDisplay}>{value?.[0]}</span>
      <SliderRadix.Root
        className={clsx(s.root, className)}
        max={max}
        onValueChange={onValueChange}
        ref={ref}
        {...props}
        value={[value?.[0] ?? 0, value?.[1] ?? max ?? 0]}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.thumb} />
        <SliderRadix.Thumb className={s.thumb} />
      </SliderRadix.Root>
      <span className={s.valueDisplay}>{value?.[1]}</span>
    </div>
  )
})

Slider.displayName = SliderRadix.Root.displayName

export { Slider }
