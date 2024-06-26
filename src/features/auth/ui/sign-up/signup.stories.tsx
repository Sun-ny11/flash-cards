import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from '@/features/auth/ui/sign-up/sign-up'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Form/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
