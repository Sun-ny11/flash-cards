import type { Meta, StoryObj } from '@storybook/react'

import { CardDropdown } from './card-dropdown'

const meta = {
  //   argTypes: {
  //     variant: {
  //       control: { type: 'radio' },
  //       options: ['primary', 'secondary'],
  //     },
  //   }, Нужна для кастомизации управления истории

  component: CardDropdown, // Компонент для истории
  tags: ['autodocs'], // Автогенерация документации
  title: 'Components/CardDropdown', // Имена папок в истории
} satisfies Meta<typeof CardDropdown>

export default meta
type Story = StoryObj<typeof meta> // Тип истории

// История
export const Primary: Story = {
  // args - пропсы
  args: {
    deck: {
      author: { id: '1', name: 'Author' },
      cardsCount: 1,
      cover: 'string123',
      created: 'string',
      id: 'string',
      isFavorite: true,
      isPrivate: true,
      name: 'string',
      updated: 'string',
      userId: 'string',
    },
  },
}
