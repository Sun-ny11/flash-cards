import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/ui'

const meta = {
  component: ControlledCheckbox,
  tags: ['autodocs'],
  title: 'Controlled/ControlledCheckbox',
} satisfies Meta<typeof ControlledCheckbox>

export default meta
type Story = StoryObj<typeof meta>

const CheckboxWithForm = () => {
  const { control } = useForm<any>()

  return <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
}

export const Default: Story = {
  args: {
    label: 'Remember me',
    name: 'rememberMe',
  },
  render: () => <CheckboxWithForm />,
}
