import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '@/features/auth/ui/forgotPassword/forgotPassword'

const meta = {
  component: ForgotPassword, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/ForgotPassword', // Имена папок в истории
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const ForgotPasswordStory: Story = {
  // args - пропсы
  args: {},
}
