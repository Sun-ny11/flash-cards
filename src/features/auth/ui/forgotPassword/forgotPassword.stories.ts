import type { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'

import { ForgotPassword } from './forgotPassword'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Form/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onSubmit: fn() },
}
