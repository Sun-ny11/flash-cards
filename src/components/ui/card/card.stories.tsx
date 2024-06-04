import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  //   argTypes: {
  //     variant: {
  //       control: { type: 'radio' },
  //       options: ['primary', 'secondary'],
  //     },
  //   }, Нужна для кастомизации управления истории

  component: Card, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/Card', // Имена папок в истории
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const AsDiv: Story = {
  // args - пропсы
  args: {
    children: 'Tabs example div',
  },
}

export const AsArticle: Story = {
  // args - пропсы
  args: {
    as: 'article',
    children: 'Tabs example article',
  },
}

export const AsSection: Story = {
  // args - пропсы
  args: {
    as: 'section',
    children: 'Tabs example section',
  },
}
