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

export const Default: Story = {
  args: {
    label: 'Remember me',
    name: 'rememberMe',
  },
  render: args => {
    const { control } = useForm<any>()

    return <ControlledCheckbox control={control} label={args.label} name={args.name} />
  },
}
