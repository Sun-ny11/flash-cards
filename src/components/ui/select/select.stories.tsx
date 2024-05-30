import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta = {
  argTypes: {
    label: Select,
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    label: 'GO',
  },
  // <SelectRadix label={'Hello'}/>
  // render: () => (
  //   <SelectRadix label={'Hello'}/>
  // ),
}
