import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '@/components/ui'

export type ControlledInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'id' | 'name' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  name,
  ...inputProps
}: ControlledInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <Input {...inputProps} {...field} error={error?.message} id={name} />
}
