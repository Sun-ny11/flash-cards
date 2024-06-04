import type { Meta, StoryObj } from '@storybook/react'

import { ControlledCheckbox } from '@/components/ui'

const meta = {
  component: ControlledCheckbox,
  tags: ['autodocs'],
  title: 'Components/ControlledCheckbox',
} satisfies Meta<typeof ControlledCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'test',
  },
}
