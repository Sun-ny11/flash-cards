import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from '@/features/editProfile/editProfile'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'edit/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
