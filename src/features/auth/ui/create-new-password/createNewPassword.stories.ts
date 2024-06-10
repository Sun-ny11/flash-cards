import type { Meta, StoryObj } from '@storybook/react'
import { CreateNewPassword } from '@/features/auth/ui/create-new-password/createNewPassword'
import { fn } from '@storybook/test'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Form/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onSubmit: fn() },
}
