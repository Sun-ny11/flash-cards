import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
  //   argTypes: {
  //     variant: {
  //       control: { type: 'radio' },
  //       options: ['primary', 'secondary'],
  //     },
  //   }, Нужна для кастомизации управления истории

  component: Button, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/Button', // Имена папок в истории
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const Primary: Story = {
  // args - пропсы
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://www.google.com/',
    variant: 'primary',
  },
}
