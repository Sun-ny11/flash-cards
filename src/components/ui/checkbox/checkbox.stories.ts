import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkbox'

const meta = {
  argTypes: {
    label: Checkbox,
    // variant: {id="my-checkbox",
    //     label="My Checkbox",
    //     checked={checked},
    //     onCheckedChange={setChecked}},
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckBoxStory: Story = {
  args: {
    checked: true,
    label: 'Hello',
  },
}
export const CheckBoxStory1: Story = {
  args: {
    checked: false,

    label: 'jjjj',
  },
}
export const CheckBoxDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'HahAH',
  },
}
