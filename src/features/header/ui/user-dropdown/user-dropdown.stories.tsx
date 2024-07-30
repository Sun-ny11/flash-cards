import type { Meta, StoryObj } from '@storybook/react'

import { UserDropdown } from '@/features/header/ui/user-dropdown/user-dropdown'

const meta = {
  //   argTypes: {
  //     variant: {
  //       control: { type: 'radio' },
  //       options: ['primary', 'secondary'],
  //     },
  //   }, Нужна для кастомизации управления истории

  component: UserDropdown, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/UserDropdown', // Имена папок в истории
} satisfies Meta<typeof UserDropdown>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const Primary: Story = {
  // args - пропсы
  args: {
    avatar: '',
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
  },
}
