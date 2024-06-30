import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Options, RadioGroup } from '@/components/ui'
type Props<T extends FieldValues> = {
  className?: string
  control?: Control<T>
  items: Options[]
  name: FieldPath<T>
}
export const ControlledRadioGroup = <T extends FieldValues>({
  className,
  control,
  items,
  name,
}: Props<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, name, rules: { required: true } })

  return (
    <>
      <RadioGroup className={className} items={items} onValueChange={onChange} {...field} />
    </>
  )
}
