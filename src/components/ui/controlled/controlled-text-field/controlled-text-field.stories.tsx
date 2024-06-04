import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field'

const meta = {
  component: ControlledTextField,
  tags: ['autodocs'],
  title: 'Components/ControlledTextField',
} satisfies Meta<typeof ControlledTextField>

export default meta
type Story = StoryObj<typeof meta>

const InputWithForm = () => {
  const { control } = useForm<any>()

  return <ControlledTextField control={control} label={'Email'} name={'email'} />
}

export const Default: Story = {
  args: {
    label: 'Email',
    name: 'email',
  },
  render: () => <InputWithForm />,
}
