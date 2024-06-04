import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/features/auth/ui/sign-in/sign-in'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/Signin',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
