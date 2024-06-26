import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/features/auth/ui/sign-in/sign-in'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Form/Signin',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
