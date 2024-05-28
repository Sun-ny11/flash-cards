import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Inputs: Story = {
  args: {
    disabled: false,
    type: 'search',
    value: 'any any',
  },
}
