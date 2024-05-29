import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { RadioGroup } from '.'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Inputs: Story = {
  args: {
    disabled: true,
    items: [
      { label: 'Did not know', value: '1' },
      { label: 'Forgot', value: '2' },
      { label: 'A lot of thought', value: '3' },
      { label: 'Confused', value: '4' },
      { label: 'Knew the answer', value: '5' },
    ],

    onValueChange: fn(),
  },
}
