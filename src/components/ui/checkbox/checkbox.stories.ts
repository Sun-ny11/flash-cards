import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  argTypes: {
    label: Select,
    // variant: {id="my-checkbox",
    //     label="My Checkbox",
    //     checked={checked},
    //     onCheckedChange={setChecked}},
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Select1: Story = {
  args: {

  },
}
