import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  argTypes: {

  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {

  },
}

